/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import HeaderBasic from "../components/HeaderBasic";
import Seo from "../components/Seo";

const LegalNotice = () => {
  return (
    <main className="page-container">
      <Seo title="LEGAL NOTICE" />

      <HeaderBasic title={{ text: "Terms and Conditions" }} />
      <section className="flex flex-col gap-12 whitespace-pre-wrap break-keep px-12 pb-24 indent-2 text-base text-zinc-800 xs:px-5">
        <ol className="flex flex-col gap-5">
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
          <li className="flex flex-col gap-5">
            <strong className="indent-0">
              Article 3 (Description, explanation and revision of the terms and
              conditions)
            </strong>
            <ol className="list-decimal">
              <li>
                &nbsp;The “mall” posts the contents of these terms and
                conditions, name of company and representative, business address
                (including address where customer complaints can be handled),
                phone number, fax number, e-mail address, business registration
                number, mail-order business report number and the person in
                charge of personal information management on the initial service
                screen (front) of the&nbsp;“mall”&nbsp;so that users can easily
                find out. However, the contents of the terms and conditions can
                be viewed by the user through the connection screen.
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
                terms and conditions on the initial screen of the mall from 7
                days before the effective date to the day before the effective
                date. However, if the contents of the terms and conditions are
                changed unfavorably to users, it is notified with a grace period
                of at least 30 days in advance. In this case, the “mall” clearly
                compares the contents before and after the revision and displays
                them in an easy-to-understand manner for users.
              </li>
              <li>
                &nbsp;When the&nbsp;“mall”&nbsp;revises these terms and
                conditions, the revised terms and conditions apply only to
                contracts concluded after the effective date, and the provisions
                of the terms and conditions before the revision are applied to
                contracts already concluded before that date. However, if a user
                who has already signed a contract sends his or her intention to
                be subject to the provisions of the revised terms and conditions
                to the&nbsp;“mall”&nbsp;within the notice period of the revised
                terms under Paragraph 3 and receives the consent of
                the&nbsp;“mall”, the revised terms and conditions will be
                applied.
              </li>
              <li>
                &nbsp;Matters not stipulated in these Terms and Conditions and
                interpretation of these Terms and Conditions shall be in
                accordance with the Consumer Protection Act in Electronic
                Commerce, etc., the Act on the Regulation of Terms and
                Conditions, the Consumer Protection Guidelines in Electronic
                Commerce, etc. and related laws or commercial practices set by
                the Fair Trade Commission.
              </li>
            </ol>
          </li>
          <li className="flex flex-col gap-5">
            <strong className="indent-0">
              Article 4 (Provision and change of services){" "}
            </strong>

            <ol className="list-decimal">
              <li>
                The “mall” will perform the following tasks:
                <ol className="list-decimal ml-4">
                  <li>
                    Provision of information on goods or services and conclusion
                    of a purchase contract
                  </li>
                  <li>
                    Delivery of goods or services for a purchase contract
                    concluded
                  </li>
                  <li>Other tasks determined by the “mall”</li>
                </ol>
              </li>
              <li>
                The “mall” may change the content of goods or services to be
                provided by a contract to be concluded in the future in case of
                out of stock of goods or services or changes in technical
                specifications. In this case, the contents of the changed goods
                or services and the date of provision shall be specified, and
                the contents of the current goods or services will be
                immediately notified to the place where they were posted.
              </li>
              <li>
                If the “mall” is unable to provide services due to the change of
                business item, abandonment of business, integration between
                companies, etc., it shall notify the user in the manner
                stipulated in Article 8 and compensate the consumer according to
                the conditions initially set forth by the “mall”. However, if
                the “mall” does not notify the compensation standards, etc., the
                mileage or reserve points of the users shall be paid to the
                users in kind or in cash corresponding to the currency value
                used in the “mall”.
              </li>
            </ol>
          </li>
          <li className="flex flex-col gap-5">
            <strong className="indent-0">
              Article 5 (Suspension of services){" "}
            </strong>
            <ol className="list-decimal">
              <li>
                The “mall” may temporarily suspend the provision of services in
                the event of maintenance, replacement and breakdown of
                information and communication facilities such as computers and
                interruption of communication, etc.
              </li>
              <li>
                The “mall” compensates for damages suffered by users or third
                parties due to the temporary suspension of the provision of
                services due to the reasons set out in Paragraph 1 above.
                However, this is not the case if the “mall” proves that there is
                no intention or negligence.
              </li>
              <li>
                If the “mall” is unable to provide services due to the change of
                business item, abandonment of business, integration between
                companies, etc., it shall notify the user in the manner
                stipulated in Article 8 and compensate the consumer according to
                the conditions initially set forth by the “mall”. However, if
                the “mall” does not notify the compensation standards, etc., the
                mileage or reserve points of the users shall be paid to the
                users in kind or in cash corresponding to the currency value
                used in the “mall”.
              </li>
            </ol>
          </li>
          <li className="flex flex-col gap-5">
            <strong className="indent-0">Article 6 (Membership) </strong>
            <ol className="list-decimal">
              <li>
                Users apply for membership by entering member information
                according to the registration form set by the “mall” and
                expressing his/her intention to agree to these terms and
                conditions.
              </li>
              <li>
                The “mall” registers as a member among users who have applied
                for membership as described in Paragraph 1, unless they fall
                under any of the following subparagraphs.
                <ol className="list-decimal ml-4">
                  <li>
                    If an applicant for membership has previously lost his/her
                    membership under Article 7 (3) of these terms and
                    conditions. However, an exception applies to those who have
                    obtained approval for re-registration of membership from the
                    “mall” after 3 years have elapsed from loss of membership
                    under Article 7 (3).
                  </li>
                  <li>
                    In case of false entries, omissions or errors during
                    registration.
                  </li>
                  <li>
                    If it is judged that registering as a member is technically
                    disruptive to the “mall” to a considerable extent.
                  </li>
                </ol>
              </li>
              <li>
                The membership subscription contract takes effect the moment the
                consent of the “mall” reaches the member.
              </li>
              <li>
                If there is a change in the registered information at the time
                of registration, the member shall notify the “mall” of the
                change within a reasonable period of time, such as by modifying
                member information.
              </li>
            </ol>
          </li>
          <li className="flex flex-col gap-5">
            <strong className="indent-0">
              Article 7 (Withdrawal of membership and loss of qualifications,
              etc.){" "}
            </strong>
            <ol className="list-decimal">
              <li>
                A member may request withdrawal from the “mall” at any time, and
                the “mall” will immediately process the membership withdrawal.
              </li>
              <li>
                If a member falls under any of the following reasons, the “mall”
                may limit or suspend membership.
                <ol className="list-decimal ml-4">
                  <li>
                    If there is false information when applying for membership
                  </li>
                  <li>
                    If a member does not make the payment for goods purchased
                    using the “mall” or other debts borne by the member in
                    relation to the use of the “mall”
                  </li>
                  <li>
                    If a member threatens the order of e-commerce, such as
                    interfering with other people's use of the "mall" or
                    stealing the information
                  </li>
                  <li>
                    If a member uses the “mall” to conduct an act prohibited by
                    laws or these terms and conditions or contrary to public
                    order and morals
                  </li>
                </ol>
              </li>
              <li>
                The “mall” may lose membership if the same act is repeated twice
                or more after the “mall” restricts or suspends membership, or if
                the cause is not corrected within 30 days.
              </li>
              <li>
                If the “mall” loses membership, membership registration is
                cancelled. In this case, the “mall” notifies it to the members
                and gives them an opportunity to explain by setting a period of
                at least 30 days before the membership registration is
                cancelled.
              </li>
            </ol>
          </li>
          <li className="flex flex-col gap-5">
            <strong className="indent-0">
              Article 8 (Notification to members)
            </strong>
            <ol className="list-decimal">
              <li>
                When the “mall” notifies the member, it can be done to the
                e-mail address designated by the member in advance with the
                “mall”.
              </li>
              <li>
                The “mall” may substitute individual notices by posting on the
                bulletin board of the “mall” for more than one week in the case
                of a notice to a large number of unspecified members. However,
                individual notices are given for matters that have a significant
                impact on the member's own transaction.
              </li>
            </ol>
          </li>
        </ol>
      </section>
    </main>
  );
};

export default LegalNotice;
