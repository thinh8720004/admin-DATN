/** @format */

import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";

// Internal imports
import MainDrawer from "@/components/drawer/MainDrawer";
import ProductDrawer from "@/components/drawer/ProductDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const ReviewTable = ({ reviews, isCheck, setIsCheck }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { currency } = useUtilsFunction();

  const handleClick = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setIsCheck([...isCheck, id]);
    } else {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
      <>
          
          
      {/* Delete Modal */}
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {/* Main Drawer */}
      {isCheck?.length < 2 && (
        <MainDrawer>
          <ProductDrawer currency={currency} id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {reviews?.map((review, index) => (
          <TableRow key={index}>
            {/* Checkbox */}
            <TableCell>
              <CheckBox
                type="checkbox"
                id={review._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(review._id)}
              />
            </TableCell>

            {/* Review ID */}
            <TableCell>
              <span className="text-sm">{review._id}</span>
            </TableCell>

            {/* Created At */}
            <TableCell>
              <span className="text-sm">{new Date(review.createdAt).toLocaleDateString()}</span>
            </TableCell>

            {/* Product ID */}
            <TableCell>
              <span className="text-sm">{review?.product?.title || "N/A"}</span>
            </TableCell>

            {/* User Name */}
            <TableCell>
              <span className="text-sm">{review?.user?.name || "Unknown User"}</span>
            </TableCell>

            {/* Comment */}
            <TableCell>
              <span className="text-sm">
                {review?.comment || "No comment"}
              </span>
            </TableCell>

            {/* Rating */}
            <TableCell>
              <span className="text-sm font-semibold">{review.rating || "N/A"}</span>
            </TableCell>

            {/* Actions */}
            <TableCell>
              <EditDeleteButton
                        id={review._id}
                        review={review}
                        isCheck={isCheck}
                // handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                        title={review?.comment || "Review"}
                  
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ReviewTable;
