import { Button, Modal, ModalBody, ModalFooter } from "@windmill/react-ui";
import React, { useContext, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useLocation } from "react-router-dom";

// internal import
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import { SidebarContext } from "@/context/SidebarContext";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import AdminServices from "@/services/AdminServices";
import CategoryServices from "@/services/CategoryServices";
import CouponServices from "@/services/CouponServices";
import CurrencyServices from "@/services/CurrencyServices";
import CustomerServices from "@/services/CustomerServices";
import ProductServices from "@/services/ProductServices";
import ReviewServices from "@/services/ReviewServices";
import SupplierServices from "@/services/SupplierServices"; // Import SupplierServices
import { notifyError, notifySuccess } from "@/utils/toast";

const DeleteModal = ({ id, ids, setIsCheck, category, title, useParamId }) => {
  console.log(title);
  console.log(id);

  const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
  const { setServiceId } = useToggleDrawer();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      if (location.pathname === "/products") {
        if (ids) {
          const res = await ProductServices.deleteManyProducts({ ids });
          setIsUpdate(true);
          notifySuccess(res.message);
          setIsCheck([]);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        } else {
          const res = await ProductServices.deleteProduct(id);
          setIsUpdate(true);
          notifySuccess(res.message);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }

      if (location.pathname === "/reviews") {
        if (ids) {
          const res = await ReviewServices.deleteManyReview({ ids });
          setIsUpdate(true);
          notifySuccess(res.message);
          setIsCheck([]);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        } else {
          const res = await ReviewServices.deleteReview(id);
          setIsUpdate(true);
          notifySuccess(res.message);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }

      if (location.pathname === "/suppliers") {
        if (ids) {
          const res = await SupplierServices.deleteManySuppliers({ ids });
          setIsUpdate(true);
          notifySuccess(res.message);
          setIsCheck([]);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        } else {
          const res = await SupplierServices.deleteSupplier(id);
          setIsUpdate(true);
          notifySuccess(res.message);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }

      if (location.pathname === "/coupons") {
        if (ids) {
          const res = await CouponServices.deleteManyCoupons({ ids });
          setIsUpdate(true);
          notifySuccess(res.message);
          setIsCheck([]);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        } else {
          const res = await CouponServices.deleteCoupon(id);
          setIsUpdate(true);
          notifySuccess(res.message);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }

      if (location.pathname === "/categories" || category) {
        if (ids) {
          const res = await CategoryServices.deleteManyCategory({ ids });
          setIsUpdate(true);
          notifySuccess(res.message);
          setIsCheck([]);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        } else {
          if (id === undefined || !id) {
            notifyError("Please select a category first!");
            setIsSubmitting(false);
            return closeModal();
          }
          const res = await CategoryServices.deleteCategory(id);
          setIsUpdate(true);
          notifySuccess(res.message);
          closeModal();
          setServiceId();
          setIsSubmitting(false);
        }
      } else if (location.pathname === `/categories/${useParamId}` || category) {
        if (id === undefined || !id) {
          notifyError("Please select a category first!");
          setIsSubmitting(false);
          return closeModal();
        }

        const res = await CategoryServices.deleteCategory(id);
        setIsUpdate(true);
        notifySuccess(res.message);
        closeModal();
        setServiceId();
        setIsSubmitting(false);
      }

      if (location.pathname === "/customers") {
        const res = await CustomerServices.deleteCustomer(id);
        setIsUpdate(true);
        notifySuccess(res.message);
        setServiceId();
        closeModal();
        setIsSubmitting(false);
      }

      if (location.pathname === "/our-staff") {
        const res = await AdminServices.deleteStaff(id);
        setIsUpdate(true);
        notifySuccess(res.message);
        setServiceId();
        closeModal();
        setIsSubmitting(false);
      }

      if (location.pathname === "/currencies") {
        if (ids) {
          const res = await CurrencyServices.deleteManyCurrency({ ids });
          setIsUpdate(true);
          notifySuccess(res.message);
          setIsCheck([]);
          closeModal();
          setIsSubmitting(false);
        } else {
          const res = await CurrencyServices.deleteCurrency(id);
          setIsUpdate(true);
          notifySuccess(res.message);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
      setServiceId();
      setIsCheck([]);
      closeModal();
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
        <span className="flex justify-center text-3xl mb-6 text-red-500">
          <FiTrash2 />
        </span>
        <p className="text-xl font-medium mb-2">
          {"Bạn sẽ không thể khôi phục lại: "} <span className="text-red-500">{title}</span> ?
        </p>
      </ModalBody>

      <ModalFooter className="justify-center">
        <Button
          className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
          layout="outline"
          onClick={closeModal}
        >
          {"Hủy"}
        </Button>
        <div className="flex justify-end">
          {isSubmitting ? (
            <Button disabled={true} type="button" className="w-full h-12 sm:w-auto">
              <img src={spinnerLoadingImage} alt="Loading" width={20} height={10} />{" "}
              <span className="font-serif ml-2 font-light">{"Processing"}</span>
            </Button>
          ) : (
            <Button onClick={handleDelete} className="w-full h-12 sm:w-auto">
              {"Xóa"}
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default React.memo(DeleteModal);
