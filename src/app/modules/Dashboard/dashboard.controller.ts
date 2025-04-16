import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { DashboardServices } from './dashboard.service'

const getAllAdminDashboards = catchAsync(async (req, res) => {
  const result = await DashboardServices.getAllDashboards()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dashboards are retrieved succesfully',
    data: result,
  })
})

export const DashboardControllers = {
  getAllAdminDashboards,
}
