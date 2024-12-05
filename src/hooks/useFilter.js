import Ajv from "ajv";
import csvToJson from "csvtojson";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as XLSX from "xlsx";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import CategoryServices from "@/services/CategoryServices";
import CustomerServices from "@/services/CustomerServices";
import ProductServices from "@/services/ProductServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import useUtilsFunction from "./useUtilsFunction";

const categorySchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    name: { type: "object" },
    description: { type: "object" },
    icon: { type: "string" },
    status: { type: "string" },
  },
  required: ["name"],
};

const couponSchema = {
  type: "object",
  properties: {
    title: { type: "object" },
    couponCode: { type: "string" },
    endTime: { type: "string" },
    discountPercentage: { type: "number" },
    minimumAmount: { type: "number" },
    productType: { type: "string" },
    logo: { type: "string" },
    discountType: { type: "object" },
    status: { type: "string" },
  },
  required: ["title", "couponCode", "endTime", "status"],
};
const customerSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
  },
  required: ["name", "email"],
};

const useFilter = (data) => {
  const ajv = new Ajv({ allErrors: true });

  const [filter, setFilter] = useState("");
  const [sortedField, setSortedField] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchCoupon, setSearchCoupon] = useState("");
  const [searchOrder, setSearchOrder] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [country, setCountry] = useState("");
  const [zone, setZone] = useState("");
  const [currency, setCurrency] = useState("");
  const [pending, setPending] = useState([]);
  const [processing, setProcessing] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [time, setTime] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataTable, setDataTable] = useState([]); //tableTable for showing on table according to filtering
  const [todayOrder, setTodayOrder] = useState("");
  const [monthlyOrder, setMonthlyOrder] = useState("");
  const [totalOrder, setTotalOrder] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [filename, setFileName] = useState("");
  const [isDisabled, setIsDisable] = useState(false);
  const [shipping, setShipping] = useState("");
  const [newProducts] = useState([]);
  const currencyRef = useRef("");
  const searchRef = useRef("");
  const userRef = useRef("");
  const couponRef = useRef("");
  const orderRef = useRef("");
  const categoryRef = useRef("");
  const countryRef = useRef("");
  const languageRef = useRef("");
  const taxRef = useRef("");
  const shippingRef = useRef("");

  dayjs.extend(isBetween);
  dayjs.extend(isToday);
  const location = useLocation();
  const { setIsUpdate, setLoading } = useContext(SidebarContext);
  const { globalSetting } = useUtilsFunction();

  //service data filtering
  const serviceData = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - time);
    let services = data?.map((el) => {
      const newDate = new Date(el?.updatedAt).toLocaleString("en-US", {
        timeZone: globalSetting?.default_time_zone,
      });
      const newObj = {
        ...el,
        updatedDate: newDate === "Invalid Date" ? "" : newDate,
      };
      return newObj;
    });
    if (location.pathname === "/dashboard") {
      const orderPending = services?.filter(
        (statusP) => statusP.status === "Pending"
      );
      setPending(orderPending);
      const orderProcessing = services?.filter(
        (statusO) => statusO.status === "Processing"
      );
      setProcessing(orderProcessing);
      const orderDelivered = services?.filter(
        (statusD) => statusD.status === "Delivered"
      );
      setDelivered(orderDelivered);
      //daily total order calculation
      const todayServices = services?.filter((order) =>
        dayjs(order.createdAt).isToday()
      );
      const todayOrder = todayServices?.reduce(
        (preValue, currentValue) => preValue + currentValue.total,
        0
      );
      setTodayOrder(todayOrder);
      //monthly order calculation
      const monthlyServices = services?.filter((order) =>
        dayjs(order.createdAt).isBetween(
          new Date().setDate(new Date().getDate() - 30),
          new Date()
        )
      );
      const monthlyOrder = monthlyServices?.reduce(
        (preValue, currentValue) => preValue + currentValue.total,
        0
      );
      setMonthlyOrder(monthlyOrder);
      //total order calculation
      const totalOrder = services?.reduce(
        (preValue, currentValue) => preValue + currentValue.total,
        0
      );
      setTotalOrder(totalOrder);
    }
    //products filtering
    if (filter) {
      services = services.filter((item) => item.parent === filter);
    }
    if (sortedField === "Low") {
      services = services.sort((a, b) => a.price < b.price && -1);
    }
    if (sortedField === "High") {
      services = services.sort((a, b) => a.price > b.price && -1);
    }
    if (searchText) {
      services = services.filter((search) =>
        search?.title?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (categoryType) {
      services = services.filter(
        (search) =>
          search?.name?.toLowerCase()?.includes(categoryType?.toLowerCase()) ||
          search?.category?.toLowerCase().includes(categoryType?.toLowerCase())
      );
    }

    //admin Filtering
    if (role) {
      services = services.filter((staff) => staff.role === role);
    }
    //User and Admin filtering
    if (searchUser) {
      services = services.filter(
        (search) =>
          search?.name?.toLowerCase().includes(searchUser.toLowerCase()) ||
          search?.phone?.toLowerCase().includes(searchUser.toLowerCase()) ||
          search?.email?.toLowerCase().includes(searchUser.toLowerCase())
      );
    }
    //Coupon filtering
    if (searchCoupon) {
      services = services?.filter(
        (search) =>
          search?.title?.toLowerCase()?.includes(searchCoupon?.toLowerCase()) ||
          search?.couponCode
            ?.toLowerCase()
            .includes(searchCoupon?.toLowerCase())
      );
    }
    // order filtering
    if (status) {
      services = services.filter((order) => order.status === status);
    }
    if (searchOrder) {
      services = services.filter((search) =>
        search.contact.toLowerCase().includes(searchOrder.toLowerCase())
      );
    }
    if (time) {
      services = services.filter((order) =>
        dayjs(order.createdAt).isBetween(date, new Date())
      );
    }

    //country filtering
    if (country) {
      services = services.filter(
        (cou) =>
          cou?.name?.toLowerCase().includes(country.toLowerCase()) ||
          cou?.iso_code?.toLowerCase().includes(country.toLowerCase())
      );
    }

    //shipping filtering
    if (shipping) {
      services = services.filter((ship) =>
        ship?.name.toLowerCase().includes(shipping.toLowerCase())
      );
    }

    // console.log("render", data, "categoryRef", categoryRef);

    return services;
  }, [
    time,
    data,
    location.pathname,
    filter,
    sortedField,
    searchText,
    categoryType,
    role,
    searchUser,
    searchCoupon,
    status,
    searchOrder,
    country,
    shipping,

    currency,
    categoryRef,
    globalSetting?.default_time_zone,
  ]);

  //pagination functionality start
  const resultsPerPage = 20;
  const totalResults = serviceData?.length;
  const handleChangePage = (p) => {
    setCurrentPage(p);
  };
  useEffect(() => {
    setDataTable(
      serviceData?.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
      )
    );
  }, [serviceData, currentPage, resultsPerPage]);
  //pagination functionality end
  //table form submit function for search start
  const handleSubmitForAll = (e) => {
    e.preventDefault();
    setSearchText(searchRef.current.value);
  };
  const handleSubmitUser = (e) => {
    e.preventDefault();
    setSearchUser(userRef.current.value);
  };
  const handleSubmitCoupon = (e) => {
    e.preventDefault();
    setSearchCoupon(couponRef.current.value);
  };
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setSearchOrder(orderRef.current.value);
  };
  const handleSubmitCategory = (e) => {
    e.preventDefault();
    setCategoryType(categoryRef.current.value);
  };

  const handleSubmitCountry = (e) => {
    e.preventDefault();
    setCountry(countryRef.current.value);
  };

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    setShipping(shippingRef.current.value);
  };

  const handleSubmitCurrency = (e) => {
    e.preventDefault();
    setCurrency(currencyRef.current.value);
  };
  // table form submit function for search end
  // handle submit multiple product data with csv format
  const handleOnDrop = (data) => {
    for (let i = 0; i < data.length; i++) {
      newProducts.push(data[i].data);
    }
  };
  const handleUploadProducts = () => {
    if (newProducts.length < 1) {
      notifyError("Please upload/select csv file first!");
    } else {
      // return notifyError("This feature is disabled for demo!");
      ProductServices.addAllProducts(newProducts)
        .then((res) => {
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
    }
  };
  const handleSelectFile = (e) => {
    e.preventDefault();
    // return notifyError("This feature is disabled for demo!");

    const fileReader = new FileReader();
    const file = e.target?.files[0];

    if (file && file.type === "application/json") {
      setFileName(file?.name);
      setIsDisable(true);

      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (e) => {
        let text = JSON.parse(e.target.result);

        let data = [];
        if (location.pathname === "/categories") {
          data = text.map((value) => {
            return {
              _id: value._id,
              id: value.id,
              status: value.status,
              name: value.name,
              description: value.description,
              parentName: value.parentName,
              parentId: value.parentId,
              icon: value.icon,
            };
          });
        }

        if (location.pathname === "/coupons") {
          data = text.map((value) => {
            return {
              title: value.title,
              couponCode: value.couponCode,
              endTime: value.endTime,
              discountPercentage: value.discountPercentage,
              minimumAmount: value.minimumAmount,
              productType: value.productType,
              logo: value.logo,
              discountType: value.discountType,
              status: value.status,
            };
          });
        }
        if (location.pathname === "/customers") {
          data = text.map((value) => {
            return {
              name: value.name,
              email: value.email,
              password: value.password,
              phone: value.phone,
            };
          });
        }
        setSelectedFile(data);
      };
    } else if (file && file.type === "text/csv") {
      setFileName(file?.name);
      setIsDisable(true);

      fileReader.onload = async (event) => {
        const text = event.target.result;
        const json = await csvToJson().fromString(text);
        // console.log("json", json);
        let data = [];

        if (location.pathname === "/categories") {
          data = json.map((value) => {
            return {
              _id: value._id,
              id: value.id,
              status: value.status,
              name: JSON.parse(value.name),
              description: JSON.parse(value.description),
              parentName: value.parentName,
              parentId: value.parentId,
              icon: value.icon,
            };
          });
        }

        if (location.pathname === "/coupons") {
          data = json.map((value) => {
            return {
              title: JSON.parse(value.title),
              couponCode: value.couponCode,
              endTime: value.endTime,
              discountPercentage: value.discountPercentage
                ? JSON.parse(value.discountPercentage)
                : 0,
              minimumAmount: value.minimumAmount
                ? JSON.parse(value.minimumAmount)
                : 0,
              productType: value.productType,
              logo: value.logo,
              // discountType: JSON.parse(value.discountType),
              status: value.status,
            };
          });
        }
        if (location.pathname === "/customers") {
          data = json.map((value) => {
            return {
              name: value.name,
              email: value.email,
              password: value.password,
              phone: value.phone,
            };
          });
        }
        setSelectedFile(data);
      };
      fileReader.readAsText(file);
    } else {
      setFileName(file?.name);
      setIsDisable(true);

      const rABS = !!fileReader.readAsBinaryString;

      fileReader.onload = function (event) {
        /* Parse data */
        const bstr = event.target.result;
        const wb = XLSX.read(bstr, {
          type: rABS ? "binary" : "array",
          bookVBA: true,
        });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const json = XLSX.utils.sheet_to_json(ws);

        let data = [];

        if (location.pathname === "/categories") {
          data = json.map((value) => {
            return {
              _id: value._id,
              id: value.id,
              status: value.status,
              name: JSON.parse(value.name),
              description: JSON.parse(value.description),
              parentName: value.parentName,
              parentId: value.parentId,
              icon: value.icon,
            };
          });
        }
       
        if (location.pathname === "/customers") {
          data = json.map((value) => {
            return {
              name: value.name,
              email: value.email,
              password: value.password ? value.password : "null",
              phone: value.phone ? value.phone : "null",
            };
          });
        }
        setSelectedFile(data);
      };

      if (rABS) {
        fileReader.readAsBinaryString(file);
      } else {
        fileReader.readAsArrayBuffer(file);
      }
    }
  };

  const handleUploadMultiple = (e) => {
    // return notifyError("This feature is disabled for demo!");

    if (selectedFile.length > 1) {
      if (location.pathname === "/categories") {
        setLoading(true);
        let categoryDataValidation = selectedFile.map((value) =>
          ajv.validate(categorySchema, value)
        );

        const isBelowThreshold = (currentValue) => currentValue === true;
        const validationData = categoryDataValidation.every(isBelowThreshold);

        if (validationData) {
          CategoryServices.addAllCategory(selectedFile)
            .then((res) => {
              setLoading(false);
              setIsUpdate(true);
              notifySuccess(res.message);
            })
            .catch((err) => {
              setLoading(false);
              notifyError(err ? err.response.data.message : err.message);
            });
        } else {
          notifyError("Please enter valid data!");
        }
      }
      if (location.pathname === "/customers") {
        setLoading(true);
        let customerDataValidation = selectedFile.map((value) =>
          ajv.validate(customerSchema, value)
        );

        const isBelowThreshold = (currentValue) => currentValue === true;
        const validationData = customerDataValidation.every(isBelowThreshold);

        // console.log(validationData);
        // console.log(customerDataValidation);

        if (validationData) {
          CustomerServices.addAllCustomers(selectedFile)
            .then((res) => {
              setLoading(false);
              setIsUpdate(true);
              notifySuccess(res.message);
            })
            .catch((err) => {
              setLoading(false);
              notifyError(err ? err.response.data.message : err.message);
            });
        } else {
          notifyError("Please enter valid data!");
        }
      }
    
    } else {
      notifyError("Please select a valid .JSON/.CSV/.XLS file first!");
    }
  };

  const handleRemoveSelectFile = (e) => {
    // console.log('remove');
    setFileName("");
    setSelectedFile([]);
    setTimeout(() => setIsDisable(false), 1000);
  };

  return {
    userRef,
    searchRef,
    couponRef,
    orderRef,
    categoryRef,
    pending,
    processing,
    delivered,
    todayOrder,
    monthlyOrder,
    totalOrder,
    setFilter,
    setSortedField,
    setStatus,
    setRole,
    time,
    zone,
    setTime,
    taxRef,
    setZone,
    filename,
    countryRef,
    dataTable,
    serviceData,
    country,
    setSearchText,
    setCountry,
    isDisabled,
    languageRef,
    currencyRef,
    shippingRef,
    setSearchUser,
    setDataTable,
    setCategoryType,
    handleChangePage,
    totalResults,
    resultsPerPage,
    handleOnDrop,
    setSearchCoupon,
    handleSelectFile,
    handleSubmitUser,
    handleSubmitForAll,
    handleSubmitCoupon,
    handleSubmitOrder,
    handleSubmitCategory,
    handleUploadProducts,
    handleSubmitCountry,
    handleSubmitCurrency,
    handleSubmitShipping,
    handleUploadMultiple,
    handleRemoveSelectFile,
  };
};

export default useFilter;
