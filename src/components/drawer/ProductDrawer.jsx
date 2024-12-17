import ReactTagInput from "@pathofdev/react-tag-input";
import {
  Button,
  Input,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  Textarea,
} from "@windmill/react-ui";
import Multiselect from "multiselect-react-dropdown";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FiX } from "react-icons/fi";
import { MultiSelect } from "react-multi-select-component";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";

//internal import
import ParentCategory from "@/components/category/ParentCategory";
import ActiveButton from "@/components/form/button/ActiveButton";
import DrawerButton from "@/components/form/button/DrawerButton";
import InputArea from "@/components/form/input/InputArea";
import InputValue from "@/components/form/input/InputValue";
import InputValueFive from "@/components/form/input/InputValueFive";
import Error from "@/components/form/others/Error";
import Title from "@/components/form/others/Title";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggleForCombination from "@/components/form/switch/SwitchToggleForCombination";
import Uploader from "@/components/image-uploader/Uploader";
import UploaderThree from "@/components/image-uploader/UploaderThree";
import useProductSubmit from "@/hooks/useProductSubmit";
import useUtilsFunction from "@/hooks/useUtilsFunction";

//internal import
import SupplierServices from "@/services/SupplierServices";
import useAsync from "@/hooks/useAsync";
import { useState, useEffect } from "react";
import DateInput from "../form/input/DateInput";

const ProductDrawer = ({ id }) => {
  let {
    tag,
    setTag,
    values,
    language,
    register,
    onSubmit,
    errors,
    slug,
    dateExpried,
    openModal,
    attribue,
    setValues,
    imageUrl,
    setImageUrl,
    handleSubmit,
    isCombination,
    variantTitle,
    attTitle,
    handleAddAtt,
    // productId,
    onCloseModal,
    isBulkUpdate,
    globalSetting,
    isSubmitting,
    tapValue,
    setTapValue,
    resetRefTwo,
    handleSkuBarcode,
    handleProductTap,
    selectedCategory,
    setSelectedCategory,
    setDefaultCategory,
    defaultCategory,
    selectedSupplier,
    setSelectedSupplier,
    handleProductSlug,
    handleSelectLanguage,
    handleIsCombination,
    handleEditVariant,
    handleRemoveVariant,
    handleClearVariant,
    handleQuantityPrice,
    handleSelectImage,
    handleSelectInlineImage,
    handleGenerateCombination,
    setType
  } = useProductSubmit(id);
  const { data: allSuppliers } = useAsync(SupplierServices.getAllSuppliers);
  const [selectedSupplierData, setSelectedSupplierData] = useState(null);

  useEffect(() => {
    if (selectedSupplier) {
      setSelectedSupplierData(selectedSupplier); // Giả sử selectedSupplier là một mảng, lấy phần tử đầu tiên

    }
  }, [selectedSupplier]);

  useEffect(() => {
    if (allSuppliers) {
      console.log(allSuppliers); // Đảm bảo rằng dữ liệu đã được trả về đúng
    }
  }, [allSuppliers]);

  const handleSupplierSelect = (selectedItem) => {
    // console.log(selectedItem);
    // console.log("selectedItem:", selectedItem);
    // console.log("selectedSupplier trước khi cập nhật:", prevSelected);
    selectedSupplier = [selectedItem];
    setSelectedSupplierData([selectedItem]);
    setSelectedSupplier([selectedItem]); // Cập nhật state khi người dùng chọn supplier
  };

  const { currency } = useUtilsFunction();
  return (
    <>
      <Modal
        open={openModal}
        onClose={onCloseModal}
        center
        closeIcon={
          <div className="absolute top-0 right-0 text-red-500  active:outline-none text-xl border-0">
            <FiX className="text-3xl" />
          </div>
        }
      >
        <div className="cursor-pointer">
          <UploaderThree
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleSelectImage={handleSelectImage}
          />
        </div>
      </Modal>

      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={"Cập nhật sản phẩm"}
          // description={"UpdateProductDescription"}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={"Thêm sản phẩm"}
          // description={"AddProductDescription"}
          />
        )}
      </div>

      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700">
        <SwitchToggleForCombination
          product
          handleProcess={handleIsCombination}
          processOption={isCombination}
        />

        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="Thông tin cơ bản"
              handleProductTap={handleProductTap}
            />
          </li>

          {isCombination && (
            <li className="mr-2">
              <ActiveButton
                tapValue={tapValue}
                activeValue="Combination"
                handleProductTap={handleProductTap}
              />
            </li>
          )}
        </ul>
      </div>

      <Scrollbars className="track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block" id="block">
          {tapValue === "Basic Info" && (
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"ProductID"} />
                <div className="col-span-8 sm:col-span-4">{productId}</div>
              </div> */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Tên sản phẩm"} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`title`, {
                      required: "TItle is required!",
                    })}
                    name="title"
                    type="text"
                    placeholder={"Nhập tên sản phẩm ..."}
                    onBlur={(e) => handleProductSlug(e.target.value)}
                  />
                  <Error errorName={errors.title} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Mô tả"} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm  block w-full bg-gray-100 border-gray-200"
                    {...register("description", {
                      required: false,
                    })}
                    name="description"
                    placeholder={"Nhập mô tả sản phẩm ..."}
                    rows="4"
                    spellCheck="false"
                  />
                  <Error errorName={errors.description} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Ảnh sản phẩm"} />
                <div className="col-span-8 sm:col-span-4">
                  <Uploader
                    product
                    folder="product"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"SKU"} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`sku`, {
                      required: "Sku is required!",
                    })}
                    label={"ProductSKU"}
                    name="sku"
                    type="text"
                    placeholder={"Nhập SKU sản phẩm ..."}
                  />
                  <Error errorName={errors.sku} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Đơn vị"} />
                <div className="col-span-8 sm:col-span-4">
                  <select name="type"  style={{color: "black"}}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("type", { required: false })}

                  >
                    <option value="" disabled>
                      Chọn đơn vị
                    </option>
                    <option value="Lọ">Lọ</option>
                    <option value="Chai">Chai</option>
                    <option value="Thùng">Thùng</option>
                    <option value="Hộp">Hộp</option>

                  </select>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Mã vạch sản phẩm"} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    required="false"
                    label={"ProductBarcode"}
                    name="barcode"
                    type="text"
                    placeholder={"Nhập mã vạch sản phẩm ..."}
                  />
                  <Error errorName={errors.barcode} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Thể loại"} />
                <div className="col-span-8 sm:col-span-4">
                  <ParentCategory
                    lang={language}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setDefaultCategory={setDefaultCategory}
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Thể loại mặc định"} />
                <div className="col-span-8 sm:col-span-4">
                  <Multiselect
                    displayValue="name"
                    isObject={true}
                    singleSelect={true}
                    ref={resetRefTwo}
                    hidePlaceholder={true}
                    onKeyPressFn={function noRefCheck() { }}
                    onRemove={function noRefCheck() { }}
                    onSearch={function noRefCheck() { }}
                    onSelect={(v) => setDefaultCategory(v)}
                    selectedValues={defaultCategory}
                    options={selectedCategory}
                    placeholder={"Chọn thể loại mặc định"}
                  ></Multiselect>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Nhà cung cấp"} />
                <div className="col-span-8 sm:col-span-4">
                  <Multiselect
                    displayValue="name"
                    isObject={true}
                    singleSelect={true}
                    onSelect={(v) => setSelectedSupplier(v)}
                    selectedValues={selectedSupplier}
                    options={allSuppliers}
                    placeholder={"Chọn nhà cung cấp"}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Giá Gốc" />
                <div className="col-span-8 sm:col-span-4">
                  <InputValue
                    disabled={isCombination}
                    register={register}
                    maxValue={100000000}
                    minValue={1}
                    label="Original Price"
                    name="originalPrice"
                    type="number"
                    placeholder="OriginalPrice"
                    defaultValue={0.0}
                    required="false"
                    product
                  />
                  <Error errorName={errors.originalPrice} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Giá Bán Sản Phẩm"} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValue
                    disabled={isCombination}
                    product
                    register={register}
                    minValue={0}
                    defaultValue={0.0}
                    required="false"
                    label="Sale price"
                    name="price"
                    type="number"
                    placeholder="Nhập giá bán ..."
                  />
                  <Error errorName={errors.price} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
                <LabelArea label={"Số lượng"} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValueFive
                    disabled={isCombination}
                    register={register}
                    minValue={0}
                    defaultValue={0}
                    label="Quantity"
                    name="stock"
                    type="number"
                    placeholder={"Nhập số lượng sản phẩm ..."}
                  />
                  <Error errorName={errors.stock} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
                <LabelArea label={"Ngày hết hạn"} />
                <div className="col-span-8 sm:col-span-4">
                  <DateInput
                    disabled={isCombination}
                    register={register}
                    label="Date Expried"
                    required="false"
                    name="dateExpried"
                  />
                  <Error errorName={errors.dateExpried} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Slug"} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`slug`, {
                      required: "slug is required!",
                    })}
                    className=" mr-2 p-2"
                    name="slug"
                    type="text"
                    defaultValue={slug}
                    placeholder={"Nhập slug sản phẩm ..."}
                    onBlur={(e) => handleProductSlug(e.target.value)}
                  />
                  <Error errorName={errors.slug} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Tag"} />
                <div className="col-span-8 sm:col-span-4">
                  <ReactTagInput
                    placeholder={"Nhập tag sản phẩm ..."}
                    tags={tag}
                    onChange={(newTags) => setTag(newTags)}
                  />
                </div>
              </div>
            </div>
          )}

          {isCombination ? (
            <DrawerButton
              id={id}
              save
              title="Sản phẩm"
              isSubmitting={isSubmitting}
              handleProductTap={handleProductTap}
            />
          ) : (
            <DrawerButton
              id={id}
              title="Sản phẩm"
              isSubmitting={isSubmitting}
            />
          )}

          {tapValue === "Combination" && (
            <DrawerButton
              id={id}
              title="Sản phẩm"
              isSubmitting={isSubmitting}
            />
          )}
        </form>

        {tapValue === "Combination" &&
          isCombination &&
          variantTitle.length > 0 && (
            <div className="px-6 overflow-x-auto">
              {isCombination && (
                <TableContainer className="md:mb-32 mb-40 rounded-b-lg">
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableCell>{"Image"}</TableCell>
                        <TableCell>{"Combination"}</TableCell>
                        <TableCell>{"Sku"}</TableCell>
                        <TableCell>{"Barcode"}</TableCell>
                        <TableCell>{"Price"}</TableCell>
                        <TableCell>{"SalePrice"}</TableCell>
                        <TableCell>{"QuantityTbl"}</TableCell>
                        <TableCell className="text-right">{"Action"}</TableCell>
                      </tr>
                    </TableHeader>
                  </Table>
                </TableContainer>
              )}
            </div>
          )}
      </Scrollbars>
    </>
  );
};

export default React.memo(ProductDrawer);
