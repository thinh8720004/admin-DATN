import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { IoRemoveSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

// Internal imports
import SupplierDrawer from "@/components/drawer/SupplierDrawer";
import MainDrawer from "@/components/drawer/MainDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import useToggleDrawer from "@/hooks/useToggleDrawer";

const SupplierTable = ({
  data,
  lang,
  isCheck,
  suppliers,
  setIsCheck,
  useParamId,
  showChild,
}) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const handleClick = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setIsCheck((prev) => [...prev, id]);
    } else {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <>
      {isCheck.length < 1 && (
        <DeleteModal useParamId={useParamId} id={serviceId} title={title} />
      )}

      <MainDrawer>
        <SupplierDrawer id={serviceId} data={data} />
      </MainDrawer>

      <TableBody>
        {suppliers?.map((supplier) => {
          const { _id, name, image, contact, email, phone, address, status } =
            supplier;
          const logoUrl =
            image ||
            "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png";

          return (
            <TableRow key={_id}>
              {/* Checkbox */}
              <TableCell>
                <CheckBox
                  type="checkbox"
                  name="supplier"
                  id={_id}
                  handleClick={handleClick}
                  isChecked={isCheck.includes(_id)}
                />
              </TableCell>

              {/* Logo */}
              <TableCell>
                <Avatar
                  className="hidden mr-3 md:block bg-gray-50 p-1"
                  src={logoUrl}
                  alt={name}
                />
              </TableCell>

              {/* Supplier Name */}
              <TableCell className="font-medium text-sm">
                  {name}
              </TableCell>

              {/* Contact Info */}
              <TableCell className="text-sm">{email}</TableCell>
              <TableCell className="text-sm">{phone}</TableCell>
              <TableCell className="text-sm">{address}</TableCell>

              {/* Status */}
              <TableCell className="text-center">
                <ShowHideButton id={_id} supplier status={status} />
              </TableCell>

              {/* Edit/Delete Button */}
              <TableCell>
                <EditDeleteButton
                  id={_id}
                  parent={supplier}
                  isCheck={isCheck}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                  title={name}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};

export default SupplierTable;
