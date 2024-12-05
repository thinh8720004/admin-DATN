import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Internal imports
import { SidebarContext } from "@/context/SidebarContext";
import SupplierServices from "@/services/SupplierServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const useSupplierSubmit = (id, data) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } = useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [checked, setChecked] = useState(""); // Could be used for Parent Supplier or related data
  const [imageUrl, setImageUrl] = useState("");
  const [children, setChildren] = useState([]);
  const [published, setPublished] = useState(true); // Can be used for active/inactive status
  const [selectSupplierName, setSelectSupplierName] = useState("Tất cả");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ name, image, description, contactName, phone, email, address }) => {
    try {
      console.log('hoat dong khong');
      console.log(imageUrl);

      setIsSubmitting(true);
      const supplierData = {
        name,
        description,
        contactName,
        phone,
        email,
        address,
        parentId: checked || undefined,
        parentName: selectSupplierName,
        image: imageUrl,
        status: published ? "active" : "inactive",
      };

      const res = id
        ? await SupplierServices.updateSupplier(id, supplierData)
        : await SupplierServices.addSupplier(supplierData);

      setIsUpdate(true);
      setIsSubmitting(false);
      notifySuccess(res.message);
      closeDrawer();
      reset();
    } catch (err) {
      setIsSubmitting(false);
      notifyError(err?.response?.data?.message || err?.message);
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      // Reset state values when the drawer is closed
      resetFormState();
      return;
    }

    if (id) {
      fetchSupplierData();
    }
  }, [id, isDrawerOpen, setValue]);

  const resetFormState = () => {
    setResData({});
    setImageUrl("");
    setPublished(true);
    setSelectSupplierName("Tất cả");
    setChecked("");
    setChildren([]);
    clearErrors();
    reset();
  };

  const fetchSupplierData = async () => {
    try {
      const res = await SupplierServices.getSupplierById(id);
      if (res) {
        setResData(res);
        setValue("name", res.name);
        setValue("contactName", res.contactName);
        setValue("phone", res.phone);
        setValue("email", res.email);
        setValue("address", res.address);
        setValue("parentId", res.parentId);
        setValue("parentName", res.parentName);
        setSelectSupplierName(res.parentName);
        setChecked(res.parentId);
        setImageUrl(res.icon);
        setPublished(res.status === "active");
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    children,
    setChildren,
    published,
    setPublished,
    checked,
    setChecked,
    isSubmitting,
    selectSupplierName,
    setSelectSupplierName,
  };
};

export default useSupplierSubmit;
