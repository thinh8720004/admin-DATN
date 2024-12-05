import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

//internal imports
import { SidebarContext } from "@/context/SidebarContext";
import CategoryServices from "@/services/CategoryServices";
import CouponServices from "@/services/CouponServices";
import CurrencyServices from "@/services/CurrencyServices";
import ProductServices from "@/services/ProductServices";
import SupplierServices from "@/services/SupplierServices";  // Import the supplier service
import { notifyError, notifySuccess } from "@/utils/toast";

const useBulkActionSubmit = (ids, lang = "en", childId) => {
  const [children, setChildren] = useState("");
  const [tag, setTag] = useState([]);
  const location = useLocation();
  const [checked, setChecked] = useState("");
  const [published, setPublished] = useState(true);
  const [published2, setPublished2] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState([]);
  const [isFoodItem, setIsFoodItem] = useState(false);
  const [selectCategoryName, setSelectCategoryName] = useState("");
  const [suppliers, setSuppliers] = useState([]); // Add state for suppliers

  const { isBulkDrawerOpen, closeBulkDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // product data
      const productData = {
        ids: ids,
        categories: selectedCategory?.map((item) => item._id),
        category: defaultCategory[0]?._id,
        productType: [isFoodItem ? "food" : "others"],
        show: data.show,
        status: published ? "show" : "hide",
        tag: JSON.stringify(tag),
      };

      // language data
      const languageData = {
        ids: ids,
        status: published ? "show" : "hide",
      };
      // currencies data
      const currenciesData = {
        ids: ids,
        enabled: published ? "show" : "hide",
        live_exchange_rates: published2 ? "show" : "hide",
      };
      // category data
      const categoryData = {
        ids: ids,
        parentId: checked,
        description: data.description,
        parentName: selectCategoryName,
        status: published ? "show" : "hide",
      };

      const couponData = {
        ids: ids,
        startTime: data.startTime,
        endTime: data.endTime,
        status: published ? "show" : "hide",
      };

      // Supplier data (new addition)
      const supplierData = {
        ids: ids,
        suppliers: suppliers?.map((item) => item._id), // Assuming suppliers have _id
        status: published ? "show" : "hide",
      };

      if (location.pathname === "/products") {
        const res = await ProductServices.updateManyProducts(productData);
        setIsUpdate(true);
        notifySuccess(res.message);
        closeBulkDrawer();
      }

      if (location.pathname === "/coupons") {
        const res = await CouponServices.updateManyCoupons(couponData);
        setIsUpdate(true);
        notifySuccess(res.message);
        closeBulkDrawer();
      }

      if (location.pathname === "/currencies") {
        const res = await CurrencyServices.updateManyCurrencies(currenciesData);
        setIsUpdate(true);
        notifySuccess(res.message);
        closeBulkDrawer();
      }

      if (location.pathname === "/categories" || location.pathname === `/categories/${childId}`) {
        const res = await CategoryServices.updateManyCategory(categoryData);
        setIsUpdate(true);
        notifySuccess(res.message);
        closeBulkDrawer();
      }

      // New block for supplier update
      if (location.pathname === "/suppliers") {
        const res = await SupplierServices.updateManySuppliers(supplierData); // New API call
        setIsUpdate(true);
        notifySuccess(res.message);
        closeBulkDrawer();
      }

    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message);
    }
  };

  useEffect(() => {
    if (!isBulkDrawerOpen) {
      setValue("parent");
      setValue("children");
      setValue("type");
      setValue("show");
      setValue("name");
      setChildren("");
      setTag([]);
      clearErrors("parent");
      clearErrors("children");
      clearErrors("type");
      clearErrors("name");

      setValue("name");
      setValue("iso_code");
      setValue("call_prefix");
      setValue("currency");
      setValue("zone");
      clearErrors("name");
      clearErrors("iso_code");
      clearErrors("call_prefix");
      clearErrors("currency");
      clearErrors("zone");
      clearErrors("status");

      setValue("name");
      setValue("iso_code");
      setValue("country");
      setValue("zone");

      setValue("description");

      clearErrors("name");
      clearErrors("iso_code");
      clearErrors("country");
      clearErrors("zone");
      clearErrors("status");
      clearErrors("show");
      clearErrors("description");
      setDefaultCategory([]);
      setSelectedCategory([]);
      return;
    }
  }, [setValue, isBulkDrawerOpen, clearErrors]);

  useEffect(() => {
    setChildren(watch("children"));
  }, [watch, children]);

  return {
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    tag,
    setTag,
    published,
    setPublished,
    published2,
    setPublished2,
    checked,
    setChecked,
    selectedCategory,
    setSelectedCategory,
    defaultCategory,
    setDefaultCategory,
    selectCategoryName,
    setSelectCategoryName,
    isFoodItem,
    setIsFoodItem,
    suppliers, // Add supplier state to the return
    setSuppliers, // Add function to update suppliers
  };
};

export default useBulkActionSubmit;
