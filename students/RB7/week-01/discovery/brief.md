# MerchantDesk Brief
**MerchantDesk is  a system which provides a clean and efficient interface for  merchants to Monitor, Validate and Record Sandbox  payment events.**

- ## The User
    
    **The Primary user of MerchantDesk will be merchants who will recieve synthetic payments from a payment simulator.**
    **MerchantDesk validates and record valid payement events or return error for invalid payment events and duplicate records.The user will able to view and manage their own payment records.**

- ## Useful Actions
    - **The user will be able to submit sandbox payment events directly to the MerchantDesk api.**
    - **The user will be able to view,filter and paginate merchant records.**
    - **The user will be able to inspect events owned by the respective user.**
- ## What's not included?
    - **Real payment processing.**
    - **Refund or retry logic.**
    - **No Payhook services.**
    - **Exposed webhook endpoints.**
    - **Card/customer data.**
    - **Provider credentials.**
    - **HMAC verification.**
    - **Account registration/reset.**
    - **Production billing.**
    - **Guaranteed exactly-once delivery.**
    - **Polished commercial dashboard.**
    - **Paid services or additional frameworks and techs other than TypeScript/JavaScript,REACT vite,Fastify,PostgreSQL**
- ## Open Questions
   1. **What additional information should be displayed on the React Interface besides payment records?**
   2. **Should an operator have access to delete their own events?**
   3. **Which fields should be used to filter and sort payment events?**
   4. **How should invalid and duplicate payment events be handled and presented?**
   5. **Is there is a timeout for each operator session?**

- ## What a  Successfull Demo Would Show?

    **A Minimal React Interface where a Merchant Operator can log in and inspect their owned payment events in a paginated format.The Interface will make requests to the MerchantDeskAPI as per the user actions(Event search,Authentication etc.).The MerchantDesk API will handle all the validation,ownership checks,autentication as well forward valid data requests to POSTgreSQL Database.The simulator will supply the synthetic payment events to the MerchantDeskAPI and the API forwards the accepted events to the Database.The Database will store all the payment records that are accepted by the API and returns the respective events to the respective user who requests it.**

- ## Context Diagram


```mermaid
    graph LR


    ReactInterface["React \nInterface"]

    PostgreSQL[("PostgreSQL \nDB")]

    MerchantAPI["MerchantDesk API:\nValidation,Authentication and Ownership checks"]

    Simulator["Simulator"] 


ReactInterface-- Requests to Access Payment Events and  Authentication Request  -->MerchantAPI
MerchantAPI-- Stores Payments Records-->PostgreSQL

Simulator-- Synthetic Payment Events-->MerchantAPI

MerchantAPI-- Returns Owned Payments Events and Errors-->ReactInterface

PostgreSQL-- Returns Payment Event Records-->MerchantAPI
