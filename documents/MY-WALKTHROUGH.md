This document aims to explain my line of thought throughout the planning, development and testing of the project. The steps, methods, tools and strategies chosen for the project full lifecycle.

# 1. Project Overview

I noted all the requirements in a document, organized in basically three sections: Overview, Server Side and Client Side. 

**Overview**: All the business logic, features and general requirements.

**Server Side:** All the front-end requirements (tech stack, UI/UX, views, auth session etc)

**Client Side:** All the back-end requirements (technical requirements, tech stack, API routes, sensors simulation etc)

# 2. Implementation Plan

With all the requirements defined, I've moved on to making a initial implementation plan, with major phases and tasks. The main plan was to use the approach of Spec-Driven Development, where you first create one or multiple documents with all the neutralrmation about the project achitecture, rules and features, so then it gets fed to the AI to do the "heavy lifting". It presents the advantages of AI development, which is much more quicker, and the usage of well built documents for a much better output quality and less allucinations and unexpected results.

First, I built the back-end with all the schema, services and basic features, and ensured it was working.
With the server working, I went on to the client side development. I used a MUI v5 theme as a start and made modifications as needed to fit the brand assets. with the basic UI working, I began to develop the integration of the server side with the client side, going through the authentication system and session management and the initial CRUDs. As the client development went along, I made some server modifications to better fit the project requirements (minor schema fixed, api routes modifications etc). 
Without loosing so much time, I made some easy QoL changes, as this step would be the final one, for finishing and polishing look and feel. Regardless the process envolved, I ensured a robust and modern architecture throughout the entire development, nothing too extreme, but the minimum to have always a good quality code and structure.