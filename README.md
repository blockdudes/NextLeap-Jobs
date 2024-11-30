# Next Leap Jobs

**A Decentralized Job Marketplace on the TON Blockchain**

## Introduction

Next Leap Jobs is a decentralized platform revolutionizing professional connections and work validation. Leveraging TON Blockchain, the platform provides immutable records of work experience through **Soulbound Tokens (SBTs)**, fostering trust and transparency. Employers and job seekers can interact directly, with plans for enhanced communication, moderation, and governance tools.

## Key Features

1. **Soulbound Tokens (SBTs)**

   - **Highlight Feature:** Employers mint SBTs upon job completion, serving as immutable proof of work.
   - These non-transferable tokens are tied to a user's profile and display job details, ratings, and employer verification, making resumes obsolete.

2. **Decentralized Job Listings**

   - Employers can post job opportunities, with completion verified through transparent, blockchain-based status updates.

3. **Community Interactions**

   - Engage with job posts and comments through upvotes, downvotes, and replies.

4. **Future-Ready Vetting System**

   - Plans for inbuilt chat systems to streamline vetting and job discussion processes.

5. **Conflict Resolution & Moderation**
   - Future DAO-based moderators will oversee disputes and ensure fair outcomes, incentivized with a percentage of job compensation.

## Tech Stack

- **Blockchain**: TON Blockchain
- **Smart Contract Language**: Tact
- **Frontend**: React.js (Next.js framework in the `frontend/` directory)
- **Wallet Integration**: TON Connect
- **Backend**: Decentralized and blockchain-driven

---

## How It Works

1. **Job Creation and Applications**  
   Employers create posts outlining job requirements, and seekers apply directly.

2. **Job Completion and Verification**  
   Once the job is completed, employers issue SBTs, which are permanently added to the seeker’s profile, ensuring a verifiable work record.

3. **Community Engagement**  
   Users interact with posts, vote on content, and contribute feedback to maintain quality within the ecosystem.

4. **Future Features**
   - **Vetting System:** Direct communication for job discussions and progress updates.
   - **Moderation by DAO Members:** Decentralized arbitration to resolve disputes transparently.

---

## Development Overview

### Current Development Phase

- **MVP Features:**
  - Job posting
  - Status updates for completion
  - Basic community interactions (posts, comments, votes)
  - SBT issuance

### Future Phases

#### **Phase 1: Enhanced Communication (ETA: 2 months)**

- Add an **inbuilt chat system** for streamlined communication between employers and job seekers.
- Notifications for status updates, job offers, and post engagements.

#### **Phase 2: Profile and Community Expansion (ETA: 4 months)**

- Introduce **profile dashboards** to display SBTs, past jobs, ratings, and community contributions.
- Improve community tools (e.g., trending jobs, leaderboards).

#### **Phase 3: Moderation and Governance (ETA: 6-8 months)**

- Launch a **moderation system** involving DAO-based members to oversee conflicts and disputes.
- Transparent compensation mechanisms for moderators, incentivizing fair resolution.

#### **Phase 4: Advanced Job Features (ETA: 12 months)**

- Add advanced job filtering, searching, and recommendation systems based on user preferences and SBT history.
- Employer dashboards to track posted jobs, applications, and issued SBTs.

---

## Instructions

### Frontend Development

The frontend is located in the `frontend/` directory. To run the development server:

1. Install dependencies:

```bash
cd frontend
bun install
bun run dev
```

2. Expose the port (e.g. 3000) on which the frontend is running using ngrok or any other tunneling service.
3. Update the `tonconnect-manifest.json` file in the `frontend/public/` directory with the new URL. Additionally, update the `manifestUrl` in `frontend/lib/AppProvider.tsx` to match the new URL.
   - Example: If the ngrok URL is `https://hs4q0fkm-3000.inc1.devtunnels.ms`, the updated `tonconnect-manifest.json` file should have the following URL:
     ```json
     {
       "url": "https://hs4q0fkm-3000.inc1.devtunnels.ms",
       "name": "Next Leap Jobs",
       "iconUrl": "https://hs4q0fkm-3000.inc1.devtunnels.ms/logo.png"
     }
     ```
   - The `manifestUrl` in `frontend/lib/AppProvider.tsx` should be updated to:
     ```tsx
     <TonConnectUIProvider manifestUrl="https://hs4q0fkm-3000.inc1.devtunnels.ms/tonconnect-manifest.json">
     ```
4. The frontend should now be accessible at the new URL as well as the local URL. You can now connect your wallet and start using the app.

### Smart Contracts Development

Smart contracts are in the `contracts/` directory.

#### Build Contracts:

```bash
cd contracts
yarn build
```

#### Test Contracts:

```bash
yarn test
```

#### Deploy Contracts:

1. Compile the contracts:
   ```bash
   yarn start
   ```
2. Select the contract to deploy.
3. Select the network to deploy to.
4. Connect your wallet.
5. Contract will be deployed.

---

## Future Vision

Next Leap Jobs aims to set a global standard for decentralized work validation and professional networking. By building a scalable, feature-rich platform with blockchain-based transparency and governance, we’re empowering individuals and communities to thrive in an open, trust-driven environment.
