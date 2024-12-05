import logoDark from "@/assets/img/logo/24pf-logo-removebg-preview-header.png";
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import useUtilsFunction from "@/hooks/useUtilsFunction";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    marginRight: 10,
    marginBottom: 20,
    marginLeft: 10,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 29,
    lineHeight: 1.5,
  },
  table: {
    display: "table",
    width: "auto",
    color: "#4b5563",
    marginRight: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 0,
    borderRadius: "8px",
    borderColor: "#e9e9e9",
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 0,
    textAlign: "left",
  },
  tableRow: {
    flexDirection: "row",
    paddingBottom: 2,
    paddingTop: 2,
    textAlign: "left",
    borderWidth: 0.8,
    borderColor: "#E5E7EB",
    borderBottom: "0",
  },
  tableRowHeder: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    paddingBottom: 4,
    paddingTop: 4,
    paddingLeft: 0,
    borderBottomWidth: 0.8,
    borderColor: "#E5E7EB",
    borderStyle: "solid",
    textTransform: "uppercase",
    textAlign: "left",
  },
  tableCol: {
    width: "25%",
    textAlign: "left",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    paddingLeft: "0",
    paddingRight: "0",
    marginLeft: "13",
    marginRight: "13",
    fontFamily: "Open Sans",
  },

  tableCellQuantity: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
    paddingLeft: "0",
    paddingRight: "0",
    marginLeft: "12",
    marginRight: "12",
  },

  invoiceFirst: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 18,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottom: 1,
    borderColor: "#f3f4f6",
  },
  invoiceSecond: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 12,
    marginLeft: "13",
    marginRight: "13",
  },
  invoiceThird: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderTop: 1,
    borderColor: "#ffffff",
    backgroundColor: "#f4f5f7",
    borderRadius: 12,
    marginLeft: "13",
    marginRight: "13",
  },
  logo: {
    width: 64,
    height: 25,
    bottom: 5,
    right: 10,
    marginBottom: 10,
    textAlign: "right",
    color: "#4b5563",
    fontFamily: "Open Sans",
    fontWeight: "bold",
    fontSize: 10.3,

    marginRight: "39%",
    textTransform: "uppercase",
  },
  title: {
    color: "#2f3032",
    fontFamily: "Open Sans",
    fontWeight: "bold",
    fontSize: 8.1,
    textTransform: "uppercase",
  },
  info: {
    fontSize: 9,
    color: "#6b7280",
    fontFamily: "Open Sans",
  },
  infoCost: {
    fontSize: 10,
    color: "#6b7280",
    marginLeft: "4%",
    marginTop: "7px",
    textAlign: "left",
    width: "25%",
  },
  invoiceNum: {
    fontSize: 9,
    color: "#6b7280",
    marginLeft: "6%",
  },
  topAddress: {
    fontSize: 10,
    color: "#6b7280",
    width: "100%",
    marginRight: "62%",
    textAlign: "right",
    whiteSapce: "nowrap",
  },
  amount: {
    fontSize: 10,
    color: "#ef4444",
  },
  totalAmount: {
    fontSize: 10,
    color: "#ef4444",
    fontFamily: "Open Sans",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "right",
  },
  status: {
    color: "#10b981",
  },
  quantity: {
    color: "#1f2937",
    textAlign: "center",
  },
  itemPrice: {
    color: "#1f2937",
    textAlign: "left",
  },
  header: {
    color: "#6b7280",
    fontSize: 9,
    fontFamily: "Open Sans",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "left",
  },

  thanks: {
    color: "#22c55e",
  },
  infoRight: {
    textAlign: "right",
    fontSize: 9,
    color: "#6b7280",
    width: "25%",
    marginRight: "39%",
    fontFamily: "Open Sans",
  },
  titleRight: {
    textAlign: "right",
    fontFamily: "Open Sans",
    fontWeight: "bold",
    fontSize: 8.1,
    width: "25%",
    marginRight: "39%",
    textTransform: "uppercase",
    color: "#2f3032",
  },
  topBg: {},
  invoiceDiv: {
    alignItems: "baseline",
  },
});
const InvoiceForDownload = ({
  data,
  globalSetting,
  currency,
  showDateFormat,
  getNumberTwo,
}
) => {

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.invoiceFirst}>
            <View style={styles.invoiceDiv}>
              <Text
                style={{
                  fontFamily: "Open Sans",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  alignItems: "baseline",
                }}
              >
                {"Thông tin hóa đơn"}
              </Text>
              <Text style={styles.info}>
                Trạng thái :{" "}
                {data?.status === "Merged" && (
                  <Text style={{ color: "#eab308" }}>{data?.status}</Text>
                )}
                {data?.status === "Pending" && (
                  <Text style={{ color: "#eab308" }}>{data?.status}</Text>
                )}
                {data?.status === "Processing" && (
                  <Text style={{ color: "#14b8a6" }}>{data?.status}</Text>
                )}
                {data?.status === "POS-Completed" && (
                  <Text style={{ color: "#14b8a6" }}>{data?.status}</Text>
                )}
                {data?.status === "Fully Returned" && (
                  <Text style={{ color: "#14b8a6" }}>{data?.status}</Text>
                )}
                {data?.status === "Partial Returned" && (
                  <Text style={{ color: "#14b8a6" }}>{data?.status}</Text>
                )}
                {data?.status === "Delivered" && (
                  <Text style={{ color: "#22c55e" }}>{data?.status}</Text>
                )}
                {data?.status === "Cancel" && (
                  <Text style={{ color: "#f43f5e" }}>{data?.status}</Text>
                )}
                {data?.status === "Deleted" && (
                  <Text style={{ color: "#f43f5e" }}>{data?.status}</Text>
                )}
              </Text>
              {globalSetting?.vat_number && (
                <Text style={styles.info}>
                  <Text className="font-semibold text-xs capitalize mt-2">
                    VAT :{" "}
                    <Text className="text-emerald-500">
                      {globalSetting?.vat_number}
                    </Text>
                  </Text>
                </Text>
              )}
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  flexDirection: "row",
                  marginLeft: 80,
                  marginTop: 35,
                  textAlign: "right",
                }}
              >
                <Image
                  src={logoDark}
                  alt="kachabazar"
                  style={{
                    width: 90,
                    alignItems: "right",
                    textAlign: "right",
                    float: "right",
                  }}
                />
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  color: "#888",
                  marginTop: 2,
                  textAlign: "right",
                  fontFamily: "Open Sans",
                }}
              >
                Địa chỉ: {globalSetting?.address} <br />
                {"\n"}
                Liên hệ: {globalSetting?.contact} <br />
                {"\n"}
                Email: {globalSetting?.email} <br />
                {"\n"}
                Website: {globalSetting?.website}
              </Text>
            </View>
          </View>

          <View style={styles.invoiceSecond}>
            <View style={{ width: "25%", alignItems: "baseline" }}>
              <Text style={[styles.title, { fontSize: 10 }]}>
                {"Thời gian:"}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  color: "#6b7280",
                  textAlign: "left",
                }}
              >
                {data?.createdAt !== undefined && (
                  <Text>{showDateFormat(data?.createdAt)}</Text>
                )}
              </Text>
            </View>
            <View style={{ width: "25%", alignItems: "baseline" }}>
              <Text style={styles.title}>
                <Text
                  style={{ width: "25%", alignItems: "baseline", fontSize: 10 }}
                >
                  {"Hóa đơn số"}
                </Text>
              </Text>
              <Text style={styles.title}>
                <Text style={{ textAlign: "left" }}>
                  <Text
                    style={{
                      fontSize: 9,
                      color: "#6b7280",
                      marginLeft: "4%",
                      marginTop: "7px",
                      textAlign: "left",
                    }}
                  >
                    #{data?.invoice}
                  </Text>
                </Text>
              </Text>
            </View>

            <View
              style={{ width: "25%", alignItems: "baseline", float: "right" }}
            >
              <Text style={styles.title}>
                <Text
                  style={{
                    fontSize: 10,
                    float: "right",
                    textAlign: "right",
                    alignItems: "baseline",
                  }}
                >
                  {"Gửi đến"}
                </Text>
              </Text>
              <Text style={styles.title}>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 9,
                    textTransform: "lowercase",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 9,
                      color: "#6b7280",
                      marginTop: "7px",
                      textAlign: "right",
                      textTransform: "lowercase",
                    }}
                  >
                    Tên khách hàng: {data?.user_info?.name}
                    <br />
                    {"\n"}
                    Liên hệ: {data?.user_info?.contact}
                    <br />
                    {"\n"}
                    Email: {data?.user_info?.email}
                    <br />
                    {"\n"}
                    Địa chỉ: {data?.user_info?.address?.substring(0, 30)}
                    {"\n"}
                    Thành phố: {data?.user_info?.city},{" "}
                    {data?.user_info?.country}, {"\n"}
                    ZipCode: {data?.user_info?.zipCode}
                  </Text>
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableRowHeder}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <Text
                    style={{
                      color: "#6b7280",
                      fontSize: 9,
                      fontFamily: "Open Sans",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      textAlign: "left",
                    }}
                  >
                    Tên sản phẩm
                  </Text>
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <Text
                    style={{
                      color: "#6b7280",
                      fontSize: 9,
                      fontFamily: "Open Sans",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      textAlign: "center",
                    }}
                  >
                    {"Số lượng"}
                  </Text>
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <Text
                    style={{
                      color: "#6b7280",
                      fontSize: 9,
                      fontFamily: "Open Sans",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      textAlign: "left",
                    }}
                  >
                    {"Giá"}
                  </Text>
                </Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <Text
                    style={{
                      color: "#6b7280",
                      fontSize: 9,
                      fontFamily: "Open Sans",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      textAlign: "right",
                    }}
                  >
                    {"Tổng tiền"}
                  </Text>
                </Text>
              </View>
            </View>
            {data?.cart?.map((item, i) => (
              <View key={i} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.id.title}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellQuantity}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        textAlign: "center",
                        alignItems: "center",
                        fontFamily: "Open Sans",
                      }}
                    >
                      {item.quantity}
                    </Text>
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        textAlign: "left",
                        fontFamily: "Open Sans",
                      }}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price)}
                    </Text>
                  </Text>
                </View>

                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#ef4444",
                        fontWeight: "bold",
                        textAlign: "right",
                        fontFamily: "Open Sans",
                      }}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price * item.quantity)}
                    </Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.invoiceThird}>
            <View style={{ width: "25%", alignItems: "baseline" }}>
              <Text style={styles.title}>{"Thanh toán:"}</Text>
              <Text style={{ fontSize: 10, color: "#0e9f6e" }}>
                {data.paymentStatus == true
                  ? "Đã thanh toán"
                  : "Chưa thanh toán"}
              </Text>
            </View>
            <View style={{ width: "25%", alignItems: "baseline" }}>
              <Text style={styles.title}>
                <Text style={{ width: "25%", alignItems: "baseline" }}>
                  Tổng tiền
                </Text>
              </Text>
              <Text style={styles.title}>
                <Text style={{ textAlign: "left" }}>
                  <Text style={styles.infoCost}>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(data?.subTotal)}
                  </Text>
                </Text>
              </Text>
            </View>

            <View style={{ width: "25%", alignItems: "baseline" }}>
              <Text style={styles.title}>
                <Text style={{ textAlign: "left" }}>{"Phí ship: "}</Text>
              </Text>
              <Text style={styles.title}>
                <Text style={{ textAlign: "left" }}>
                  <Text style={styles.infoCost}>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(data.shippingCost)}
                  </Text>
                </Text>
              </Text>
            </View>
            <View style={{ width: "25%", alignItems: "baseline" }}>
              <Text style={styles.title}>
                <Text style={{ textAlign: "left" }}>{"Giảm giá"} </Text>
              </Text>
              <Text style={styles.title}>
                <Text style={{ textAlign: "left" }}>
                  <Text style={styles.infoCost}>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(data.discount)}
                  </Text>
                </Text>
              </Text>
            </View>
            <View style={{ width: "25%", alignItems: "baseline" }}>
              <Text style={styles.title}>
                <Text
                  style={{ width: "45%", textAlign: "right", float: "left" }}
                >
                  Tổng cộng:
                </Text>
              </Text>
              <Text style={styles.title}>
                <Text style={styles.totalAmount}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(data.total)}
                </Text>
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default InvoiceForDownload;
