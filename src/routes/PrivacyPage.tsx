import { HomeHeader } from "~/components/Home/HomeHeader";

export default function PrivacyPage() {
  return (
    <div>
      <HomeHeader />
      <div
        style={{
          width: "800px",
          marginLeft: "12px",
          marginTop: "12px",
          marginBottom: "12px",
        }}
      >
        <b>PRIVACY NOTICE</b>
        <br />
        <h3>Last updated June 01, 2022</h3>
        <br />
        <p>
          This privacy notice for Stack Hero Limited ("Company," "we," "us," or
          "our"), describes how and why we might collect, store, use, and/or
          share ("process") your information when you use our services
          ("Services"), such as when you: Visit our website at
          https://jsonhero.io, or any website of ours that links to this privacy
          notice Engage with us in other related ways, including any sales,
          marketing, or events Questions or concerns? Reading this privacy notice
          will help you understand your privacy rights and choices. If you do not
          agree with our policies and practices, please do not use our Services.
          If you still have any questions or concerns, please contact us at
          hello@jsonhero.io.
        </p>
        <p>
          For the full privacy policy, please visit the original page at{" "}
          <a href="https://jsonhero.io/privacy" className="text-blue-500 underline">
            jsonhero.io/privacy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
