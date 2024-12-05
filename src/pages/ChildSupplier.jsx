/** @format */

import {
  Button,
  Card,
  CardBody,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronRight, FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

// Internal imports
import SupplierTable from "@/components/supplier/SupplierTable";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import Loading from "@/components/preloader/Loading";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import SupplierServices from "@/services/SupplierServices"; // Adjusted to SupplierServices
import useUtilsFunction from "@/hooks/useUtilsFunction";

const ChildSupplier = () => {
  const { id } = useParams();
  const [childSupplier, setChildSupplier] = useState([]);
  const [selectedObj, setSelectObj] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const { toggleDrawer, lang } = useContext(SidebarContext);
  const { handleDeleteMany, allId, handleUpdateMany } = useToggleDrawer();
  const { data, loading, error } = useAsync(SupplierServices.getAllSupplier); // Adjusted to SupplierServices

  const { t } = useTranslation();

  useEffect(() => {
    const getAncestors = (target, children, ancestors = []) => {
      for (let node of children) {
        if (node._id === target) {
          return ancestors.concat(node);
        }
        const found = getAncestors(target, node?.children, ancestors?.concat(node));
        if (found) {
          return found;
        }
      }
      return undefined;
    };

    const findChildArray = (obj, target) => {
      return obj._id === target
        ? obj
        : obj?.children?.reduce((acc, obj) => acc ?? findChildArray(obj, target), undefined);
    };

    if (!loading && data?.length > 0) {
      const result = findChildArray(data[0], id);
      const res = getAncestors(id, data[0]?.children);

      if (result?.children?.length > 0) {
        setChildSupplier(result?.children);
        setSelectObj(res);
      }
    }
  }, [id, loading, data]);

  const {
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleChangePage,
  } = useFilter(childSupplier);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(childSupplier?.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  return (
    <>
      <PageTitle>{t("SupplierPageTitle")}</PageTitle>

      <DeleteModal ids={allId} setIsCheck={setIsCheck} supplier /> {/* Adjusted for suppliers */}

      <BulkActionDrawer
        ids={allId}
        title="Child Suppliers"
        lang={lang}
        data={data}
        childId={id}
      />

      <div className="flex items-center pb-4">
        <ol className="flex items-center w-full overflow-hidden font-serif">
          <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold">
            <Link to={`/suppliers`}>{t("Suppliers")}</Link> {/* Adjusted for suppliers */}
          </li>
          {selectedObj?.map((child, i) => (
            <span key={i + 1} className="flex items-center font-serif">
              <li className="text-sm mt-[1px]">
                <FiChevronRight />
              </li>
              <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer text-blue-700 hover:text-emerald-500 font-semibold">
                <Link to={`/suppliers/${child._id}`}>{child?.name}</Link> {/* Adjusted for suppliers */}
              </li>
            </span>
          ))}
        </ol>
      </div>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <div className="flex justify-end items-end">
            <Button onClick={toggleDrawer} className="rounded-md h-12">
              <span className="mr-3">
                <FiPlus />
              </span>
              {t("AddSupplier")} {/* Adjusted for suppliers */}
            </Button>

            <div className="ml-3 w-full md:w-24 lg:w-24 xl:w-24">
              <Button
                disabled={isCheck.length < 1}
                onClick={() => handleUpdateMany(isCheck)}
                className="w-full rounded-md h-12"
              >
                <FiEdit />
                {t("Hành động hàng loạt")}
              </Button>
            </div>

            <Button
              disabled={isCheck.length < 1}
              onClick={() => handleDeleteMany(isCheck)}
              className="ml-3 rounded-md h-12 bg-red-500"
            >
              <span className="mr-3">
                <FiTrash2 />
              </span>
              {t("Delete")}
            </Button>
          </div>
        </CardBody>
      </Card>

      {loading ? (
        <Loading loading={loading} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                  />
                </TableCell>
                <TableCell>{t("supplierIdTbl")}</TableCell> {/* Adjusted for suppliers */}
                <TableCell>{t("supplierLogoTbl")}</TableCell> {/* Adjusted for suppliers */}
                <TableCell>{t("Name")}</TableCell>
                <TableCell>{t("Description")}</TableCell>
                <TableCell className="text-center">
                  {t("supplierPublishedTbl")} {/* Adjusted for suppliers */}
                </TableCell>
                <TableCell className="text-right">
                  {t("supplierActionsTbl")} {/* Adjusted for suppliers */}
                </TableCell>
              </tr>
            </TableHeader>

            <SupplierTable
              suppliers={dataTable}
              data={data}
              lang={lang}
              isCheck={isCheck}
              setIsCheck={setIsCheck}
              useParamId={id}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, there are no suppliers right now." />
      )}
    </>
  );
};

export default ChildSupplier;
