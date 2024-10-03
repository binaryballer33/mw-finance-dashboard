const BACKEND_BASE_URL = "http://localhost:3333"

const apiRoutes = {
    ccAndCsp: {
        read: `${BACKEND_BASE_URL}/api/cc-and-csp`,
    },
}

const routes = {
    // api routes
    api: { ...apiRoutes },

    coveredCallCashSecuredPutData: "prisma/cc_csp_profit_loss.json",
}

export default routes
