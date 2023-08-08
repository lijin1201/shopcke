import Link from "next/link";
import HeaderBasic from "../components/HeaderBasic";
import Seo from "../components/Seo";

const LegalNotice = () => {
  return (
    <main className="page-container">
      <Seo title="LEGAL NOTICE" />

      <HeaderBasic title={{ text: "Terms and Conditions" }} />
      <section className="flex flex-col gap-12 whitespace-pre-wrap break-keep px-12 pb-24 indent-2 text-base text-zinc-800 xs:px-5">
        <ol className="flex flex-col gap-12">
          <li className="flex flex-col gap-5">
            <strong className="indent-0">Article 1 (Purpose)</strong>
          </li>
          <p>
            These terms and conditions apply to the use of internet-related
            services (hereinafter referred to as “services”) provided by CKT
            cybermall (hereinafter referred to as the “mall”) that KS AEROSPACE
            INC. (e-commerce business operator) operates. The purpose of these
            terms and conditions is to stipulate the rights, obligations and
            responsibilities of the cybermall and users when using the services.
          </p>
          <li className="flex flex-col gap-5">
            <strong className="indent-0">Article 2 (Definition)</strong>
            <ol className="list-decimal">
              {/* className="flex flex-col gap-4"> */}
              <li>
                The “mall” refers to a virtual business place set up by KS
                AEROSPACE INC. so that goods or services (hereinafter referred
                to as “goods, etc.”) can be traded using information and
                communication facilities such as computers to provide users with
                goods and services and is also used in the sense of a business
                that operates a cybermall.
              </li>
              <li>
                “Users” refer to members and non-members who access the “mall”
                and receive services provided by the “mall” in accordance with
                these terms and conditions.
              </li>
              <li>
                ‘Member’ refers to a person who has registered as a member in
                the “mall” and can continuously use the services provided by the
                “mall”.
              </li>
              <li>
                ‘Non-member’&nbsp;refers to a person who uses the service
                provided by the&nbsp;“mall”&nbsp;without registering as a
                member.
              </li>
            </ol>
          </li>
          <strong className="indent-0">
            Article 3 (Description, explanation and revision of the terms and
            conditions)
          </strong>
          <ol className="list-decimal">
            <li>
              &nbsp;The “mall” posts the contents of these terms and conditions,
              name of company and representative, business address (including
              address where customer complaints can be handled), phone number,
              fax number, e-mail address, business registration number,
              mail-order business report number and the person in charge of
              personal information management on the initial service screen
              (front) of the&nbsp;“mall”&nbsp;so that users can easily find out.
              However, the contents of the terms and conditions can be viewed by
              the user through the connection screen.
            </li>
            <li>
              &nbsp;Before the user agrees to the terms and conditions,
              the&nbsp;“mall”&nbsp;provides a separate connection screen or
              pop-up screen so that the user can understand important details
              such as withdrawal of subscription, delivery responsibility, and
              refund conditions among the contents set forth in the terms and
              conditions and asks for confirmation from the user.
            </li>
            <li>
              The “mall” may revise these terms and conditions without
              violating「Act on Consumer Protection in Electronic Commerce,
              Etc.」,&nbsp;「Act on Regulation of Terms and
              Conditions」,&nbsp;「Framework Act on Electronic Documents and
              Electronic Transactions」,&nbsp;「Electronic Financial
              Transactions Act」,&nbsp;「Electronic Signature
              Act」,&nbsp;「Information and Communications Network Utilization
              Promotion and Information Protection, etc. Act, etc , “Act on
              Door-to-door Sales, etc.”, and “Basic Consumer Act”.
            </li>
            <li>
              &nbsp;When the&nbsp;“mall”&nbsp;revises these terms and
              conditions, the date of application and the reason for the
              amendment shall be specified and notified along with the current
              terms and conditions on the initial screen of the mall from 7 days
              before the effective date to the day before the effective date.
              However, if the contents of the terms and conditions are changed
              unfavorably to users, it is notified with a grace period of at
              least 30 days in advance. In this case, the “mall” clearly
              compares the contents before and after the revision and displays
              them in an easy-to-understand manner for users.
            </li>
            <li>
              &nbsp;When the&nbsp;“mall”&nbsp;revises these terms and
              conditions, the revised terms and conditions apply only to
              contracts concluded after the effective date, and the provisions
              of the terms and conditions before the revision are applied to
              contracts already concluded before that date. However, if a user
              who has already signed a contract sends his or her intention to be
              subject to the provisions of the revised terms and conditions to
              the&nbsp;“mall”&nbsp;within the notice period of the revised terms
              under Paragraph 3 and receives the consent of the&nbsp;“mall”, the
              revised terms and conditions will be applied.
            </li>
            <li>
              &nbsp;Matters not stipulated in these Terms and Conditions and
              interpretation of these Terms and Conditions shall be in
              accordance with the Consumer Protection Act in Electronic
              Commerce, etc., the Act on the Regulation of Terms and Conditions,
              the Consumer Protection Guidelines in Electronic Commerce, etc.
              and related laws or commercial practices set by the Fair Trade
              Commission.
            </li>
          </ol>
          <li></li>
        </ol>
      </section>
    </main>
  );
};

export default LegalNotice;
