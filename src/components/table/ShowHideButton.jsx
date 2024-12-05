import { useContext } from "react";
import { useLocation } from "react-router-dom";
import Switch from "react-switch";

//internal imports
import { SidebarContext } from "@/context/SidebarContext";
import CategoryServices from "@/services/CategoryServices";
import CouponServices from "@/services/CouponServices";
import CurrencyServices from "@/services/CurrencyServices";
import ProductServices from "@/services/ProductServices";
import SupplierServices from "@/services/SupplierServices"; // Import Supplier services
import { notifyError, notifySuccess } from "@/utils/toast";

const ShowHideButton = ({ id, status, category, currencyStatusName, isSupplier }) => {
  const location = useLocation();
  const { setIsUpdate } = useContext(SidebarContext);

  const handleChangeStatus = async (id) => {
    try {
      let newStatus;
      if (status === "show") {
        newStatus = "hide";
      } else {
        newStatus = "show";
      }

      // Handle for Categories
      if (location.pathname === "/categories" || category) {
        const res = await CategoryServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res.message);
      }

      // Handle for Products
      if (location.pathname === "/products") {
        const res = await ProductServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res.message);
      }

      // Handle for Currencies
      if (location.pathname === "/currencies") {
        if (currencyStatusName === "status") {
          const res = await CurrencyServices.updateEnabledStatus(id, {
            status: newStatus,
          });
          setIsUpdate(true);
          notifySuccess(res.message);
        } else {
          const res = await CurrencyServices.updateLiveExchangeRateStatus(id, {
            live_exchange_rates: newStatus,
          });
          setIsUpdate(true);
          notifySuccess(res.message);
        }
      }

      // Handle for Coupons
      if (location.pathname === "/coupons") {
        const res = await CouponServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res.message);
      }

      // Handle for Our Staff
      if (location.pathname === "/our-staff") {
        const res = await CouponServices.updateStaffStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res.message);
      }

      // Handle for Suppliers (New logic)
      if (isSupplier) {
        const res = await SupplierServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res.message);
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
    }
  };

  return (
    <Switch
      onChange={() => handleChangeStatus(id)}
      checked={status === "show" ? true : false}
      className="react-switch md:ml-0"
      uncheckedIcon={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: 120,
            fontSize: 14,
            color: "white",
            paddingRight: 22,
            paddingTop: 1,
          }}
        ></div>
      }
      width={30}
      height={15}
      handleDiameter={13}
      offColor="#E53E3E"
      onColor={"#2F855A"}
      checkedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 73,
            height: "100%",
            fontSize: 14,
            color: "white",
            paddingLeft: 20,
            paddingTop: 1,
          }}
        ></div>
      }
    />
  );
};

export default ShowHideButton;
