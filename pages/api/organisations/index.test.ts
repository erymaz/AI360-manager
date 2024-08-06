export {};

// import * as orgService from '@/lib/services/organisation';
// import handler from './index';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { getServerSession } from '@roq/nextjs';
// import { createRequest, createResponse, RequestMethod } from 'node-mocks-http';
//
// export type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
// export type APiResponse = NextApiResponse & ReturnType<typeof createResponse>;
//
// jest.mock('lib/api/organisation');
// jest.setTimeout(20000);
//
// const mockedCreateOrg = orgService.createOrganisation as jest.Mock;
// const mockedDoesOrgExist = orgService.doesOrganisationExist as jest.Mock;
// jest.mock('@roq/nextjs', () => ({
//   getServerSession: jest.fn(),
// }))
// const mockedGetServerSession = getServerSession as jest.Mock;
// const serverSession = {
//   clerkUserId: 'cc20ce3f-73e9-4c9d-9695-cdf152b63075',
//   user: {
//     firstName: "John",
//     lastName: "Doe"
//   }
// };
// mockedGetServerSession.mockReturnValue(serverSession);
//
// describe('Handler', () => {
//   function mockRequestResponse(method: RequestMethod = 'GET', body: any = undefined) {
//     const req = createRequest<ApiRequest>();
//     const res = createResponse<APiResponse>();
//
//     req.method = method;
//     req.headers = {
//       'Content-Type': 'application/json'
//     };
//     if (body) {
//       req.body = body;
//     }
//     return { req, res };
//   }
//
//   afterEach(() => {
//     mockedCreateOrg.mockClear();
//     mockedDoesOrgExist.mockResolvedValue(false);
//   });
//
//   const validData: any = {
//     firstName: 'John',
//     lastName: 'Doe',
//     billingInfo: {
//       billingAddress: {
//         addressLine1: '123 Main St',
//         city: 'Anytown',
//         state: 'CA',
//         postalCode: '12345',
//         country: 'USA',
//       },
//     },
//     companyName: 'Acme Inc.',
//     companyWebsite: 'https://www.example.com',
//     organisationId: "acme",
//     phoneNumber: '123-456-7890',
//     termsAgreement: true,
//   };
//
//   it('returns 200 and creates an organisation with valid data', async () => {
//     mockedCreateOrg.mockResolvedValue({ acknowledged: true });
//
//     const { req, res } = mockRequestResponse('POST', validData);
//
//     await handler(req, res);
//
//     expect(res.statusCode).toBe(201);
//     expect(mockedCreateOrg).toHaveBeenCalledTimes(1);
//     expect(mockedCreateOrg).toHaveBeenCalledWith(serverSession, validData);
//   });
//
//   it('returns 400 when validation fails', async () => {
//     const invalidData = { ...validData, email: 'invalid-email' };
//
//     const { req, res } = mockRequestResponse('POST', invalidData);
//
//     await handler(req, res);
//
//     expect(res.statusCode).toBe(400);
//     expect(res._getJSONData().error).toMatch(/email/);
//     expect(mockedCreateOrg).not.toHaveBeenCalled();
//   });
//
//   it('returns 400 with duplicate company id', async () => {
//     mockedDoesOrgExist.mockResolvedValue(true);
//
//     const { req, res } = mockRequestResponse('POST', validData);
//
//     await handler(req, res);
//
//     expect(res.statusCode).toBe(400);
//     expect(res._getJSONData().error).toMatch(/already a company with this ID/);
//     expect(mockedCreateOrg).not.toHaveBeenCalled();
//   });
//
//   it('returns 500 when createOrganisation throws an error', async () => {
//     const errorMessage = 'An error occurred';
//     mockedCreateOrg.mockImplementation(() => {
//       throw new Error(errorMessage);
//     });
//
//     const { req, res } = mockRequestResponse('POST', validData);
//
//     await handler(req, res);
//
//     expect(res.statusCode).toBe(500);
//     expect(res._getJSONData().error).toBe(`Error: ${errorMessage}`);
//     expect(mockedCreateOrg).toHaveBeenCalledTimes(1);
//   });
// });
