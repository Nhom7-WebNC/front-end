import { lazy } from "react";
const InfoAccount = lazy(() => import("./InfoAccount"));

const ListAccount = lazy(() => import("./ListAccount"));

const ListReceiver = lazy(() => import("./ListReceiver"));

const TransferSameBank = lazy(() => import("./TransferSameBank"));

const TransferOtherBank = lazy(() => import("./TransferOtherBank"));

const SendHistory = lazy(() => import("./SendHistory.js"));

const ReceiveHistory = lazy(() => import("./ReceiveHistory"));

const DebtCreate = lazy(() => import("./DebtCreate"));

const DebtReceive = lazy(() => import("./DebtReceive"));

const routes = [
  {
    path: "/customer/info-account",
    exact: true,
    name: "Thông tin tài khoản",
    component: InfoAccount,
  },

  {
    path: "/customer/list-receiver",
    exact: true,
    name: "Danh sách người nhận",
    component: ListReceiver,
  },

  {
    path: "/customer/transfer-same-bank",
    exact: true,
    name: "Chuyển tiền cùng ngân hàng",
    component: TransferSameBank,
  },

  {
    path: "/customer/transfer-other-bank",
    exact: true,
    name: "Chuyển tiền liên ngân hàng",
    component: TransferOtherBank,
  },

  {
    path: "/customer/debt-create",
    exact: true,
    name: "Nhắc nợ đã tạo",
    component: DebtCreate,
  },

  {
    path: "/customer/debt-receive",
    exact: true,
    name: "Nhắc nợ đã nhận",
    component: DebtReceive,
  },

  {
    path: "/customer/history-send",
    exact: true,
    name: "Lịch sử giao dịch gửi tiền",
    component: SendHistory,
  },

  {
    path: "/customer/history-receive",
    exact: true,
    name: "Lịch sử giao dịch nhận tiền",
    component: ReceiveHistory,
  },
];

export default routes;
