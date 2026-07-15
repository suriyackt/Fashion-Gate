"use client";

import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid"; // Use modern Grid
import { getLocalizedValue } from "@/lib/sanity";

interface TermsClientProps {
  lang: "ar" | "en";
  initialData?: any;
}

export default function TermsClient({ lang, initialData }: TermsClientProps) {
  const [activeSection, setActiveSection] = useState("intro");
  const isAr = lang === "ar";

  // 1. Resolve dynamic sections list from Sanity (or fallback)
  const dynamicSections = React.useMemo(() => {
    if (initialData?.sections && Array.isArray(initialData.sections)) {
      return [
        { id: "intro", title: getLocalizedValue(initialData.introTitle, lang) || (isAr ? "المقدمة" : "Introduction") },
        ...initialData.sections.map((sec: any) => ({
          id: sec.sectionId,
          title: getLocalizedValue(sec.title, lang) || sec.sectionId
        }))
      ];
    }
    // Fallback static sections list
    return [
      { id: "intro", title: isAr ? "مقدمة" : "Introduction" },
      { id: "online-store", title: isAr ? "١. شروط المتجر الإلكتروني" : "1. Online Store Terms" },
      { id: "general", title: isAr ? "٢. الشروط العامة" : "2. General Conditions" },
      { id: "accuracy", title: isAr ? "٣. دقة وصلاحية المعلومات" : "3. Accuracy & Timeliness of Information" },
      { id: "modifications", title: isAr ? "٤. تعديلات الخدمة والأسعار" : "4. Modifications to the Service and Prices" },
      { id: "products", title: isAr ? "٥. المنتجات والخدمات" : "5. Products and Services" },
      { id: "billing", title: isAr ? "٦. معلومات الفواتير والحساب" : "6. Billing and Account Information" },
      { id: "third-party", title: isAr ? "٧. روابط الأطراف الثالثة" : "7. Third Party Links" },
      { id: "comments", title: isAr ? "٨. تعليقات ومشاركات المستخدمين" : "8. User Comments and Submissions" },
      { id: "personal", title: isAr ? "٩. معلوماتك الشخصية" : "9. Personal Information" },
      { id: "errors", title: isAr ? "١٠. الأخطاء وعدم الدقة والسهو" : "10. Errors, Inaccuracies, and Omission" },
      { id: "prohibited", title: isAr ? "١١. الاستخدامات المحظورة" : "11. Prohibited Uses" },
      { id: "disclaimer", title: isAr ? "١٢. إخلاء المسؤولية وحدودها" : "12. Disclaimer of Warranties and Limitation of Liability" },
      { id: "indemnification", title: isAr ? "١٣. التعويض" : "13. Indemnification" },
      { id: "severability", title: isAr ? "١٤. الفصل والتجزئة" : "14. Severability" },
      { id: "termination", title: isAr ? "١٥. الإنهاء" : "15. Termination" },
      { id: "governing", title: isAr ? "١٦. القانون الحاكم" : "16. Governing Law" },
      { id: "changes", title: isAr ? "١٧. التغييرات في الشروط والأحكام" : "17. Changes to Terms and Conditions" },
      { id: "contact", title: isAr ? "١٨. معلومات الاتصال" : "18. Contact Information" }
    ];
  }, [initialData, lang, isAr]);

  // 2. Scroll event listener for index tracking
  useEffect(() => {
    const handleScroll = () => {
      // Check if user is at the absolute bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 15;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      const scrollPosition = window.scrollY + 200;
      for (const section of dynamicSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dynamicSections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -180;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // 3. Resolve metadata text values
  const pageTitle = getLocalizedValue(initialData?.title, lang) || (isAr ? "الشروط والأحكام" : "Terms & Conditions");
  const pageSubtitle = getLocalizedValue(initialData?.subtitle, lang) || (isAr 
    ? "تحدد هذه الشروط القواعد واللوائح الخاصة باستخدام موقع فاشن غيت سوريا وخدماته." 
    : "These terms define the rules and regulations governing your use of Fashion Gate Syria and its services.");
  const updatedText = isAr ? "آخر تحديث: يوليو 2026" : "Last Updated: July 2026";

  // 4. Resolve Introduction Texts
  const introTitleText = getLocalizedValue(initialData?.introTitle, lang) || (isAr ? "المقدمة" : "Introduction");
  const introPara1 = getLocalizedValue(initialData?.introText1, lang) || (isAr 
    ? "أهلاً بكم في فاشن غيت سوريا. تحكم هذه الشروط والأحكام استخدامكم لموقعنا الإلكتروني وخدماتنا. من خلال الدخول إلى منصتنا أو الشراء منها، فإنكم توافقون على هذه القواعد. إذا كنتم لا توافقون على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا." 
    : "Welcome to Fashion Gate Syria. These terms and conditions govern your use of our website and services. By accessing or purchasing from our platform, you agree to these rules. If you do not agree with any part of these terms, please do not use our services.");
  const introPara2 = getLocalizedValue(initialData?.introText2, lang) || (isAr 
    ? "يتم تشغيل هذا الموقع بواسطة فاشن غيت سوريا. في جميع أنحاء الموقع، تشير المصطلحات 'نحن' و'نصنع' و'خاصتنا' إلى فاشن غيت سوريا. نحن نقدم هذا الموقع الإلكتروني، بما في ذلك جميع المعلومات والأدوات والخدمات المتاحة من هذا الموقع لكم، كمستخدمين، بشرط موافقتكم على جميع الشروط والأحكام والسياسات والإشعارات المذكورة هنا." 
    : "This website is operated by Fashion Gate Syria. Throughout the site, the terms \"we,\" \"us,\" and \"our\" refer to Fashion Gate Syria. We offer this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.");

  // 5. Fallback translation settings for loop items
  const t = React.useMemo(() => ({
    onlineStore: isAr 
      ? "من خلال الموافقة على هذه الشروط، فإنكم تقرون بأنكم قد بلغتم سن الرشد في مقاطعتكم أو بلدكم أو دولة إقامتكم على الأقل. لا يجوز لكم استخدام منتجاتنا لأي غرض غير قانوني أو غير مصرح به. سيؤدي أي خرق أو انتهاك لأي من الشروط إلى إنهاء فوري لخدماتكم." 
      : "By agreeing to these terms, you represent that you are at least the age of majority in your province or state of residence. You may not use our products for any illegal or unauthorized purpose. A breach or violation of any of the terms will result in an immediate termination of your services.",
    general: isAr 
      ? "نحتفظ بالحق في رفض الخدمة لأي شخص ولأي سبب وفي أي وقت. تفهمون أن المحتوى الخاص بكم (لا يشمل معلومات بطاقة الائتمان) قد يتم نقله غير مشفر ويتضمن عمليات إرسال عبر شبكات مختلفة. وتوافقون على عدم إعادة إنتاج أو تكرار أو نسخ أو بيع أو إعادة بيع أو استغلال أي جزء من الخدمة دون إذن كتابي صريح منا." 
      : "We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information) may be transferred unencrypted and involve transmissions over various networks. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the service without express written permission from us.",
    accuracy: isAr 
      ? "نحن لسنا مسؤولين إذا كانت المعلومات المتاحة على هذا الموقع غير دقيقة أو كاملة أو حديثة. يتم توفير المواد الموجودة على هذا الموقع للحصول على معلومات عامة فقط ولا ينبغي الاعتماد عليها أو استخدامها كأساس وحيد لاتخاذ القرارات. أي اعتماد على المواد الموجودة على هذا الموقع يكون على مسؤوليتكم الخاصة." 
      : "We are not responsible if information made available on this site is not accurate, complete, or current. The material on this site is provided for general information only and should not be relied upon as the sole basis for making decisions. Any reliance on the material on this site is at your own risk.",
    modifications: isAr 
      ? "أسعار منتجاتنا عرضة للتغيير دون إشعار مسبق. نحتفظ بالحق في أي وقت في تعديل الخدمة أو أي جزء منها أو إيقافها دون إشعار في أي وقت. لن نكون مسؤولين تجاهكم أو تجاه أي طرف ثالث عن أي تعديل أو تغيير في الأسعار أو تعليق الخدمة أو إيقافها." 
      : "Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the service or any part of it without notice at any time. We shall not be liable to you or to any third party for any modification, price change, suspension, or discontinuance of the service.",
    products: isAr 
      ? "قد تتوفر بعض المنتجات أو الخدمات حصرياً عبر الإنترنت من خلال الموقع الإلكتروني. قد تكون هذه المنتجات أو الخدمات ذات كميات محدودة وتخضع للإرجاع أو الاستبدال فقط وفقاً لسياسة الإرجاع الخاصة بنا. لقد بذلنا قصارى جهدنا لعرض ألوان وصور منتجاتنا التي تظهر في المتجر بأكبر قدر ممكن من الدقة، ولكن لا يمكننا ضمان دقة عرض شاشة الكمبيوتر الخاص بكم لأي لون." 
      : "Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our return policy. We have made every effort to display as accurately as possible the colors and images of our products that appear at the store, but we cannot guarantee that your computer monitor display of any color will be accurate.",
    billing: isAr 
      ? "نحتفظ بالحق في رفض أي طلب تقدمونه لنا. يجوز لنا، بمحض تقديرنا، تحديد أو إلغاء الكميات المشتراة للشخص الواحد أو للأسرة الواحدة أو للطلب الواحد. توافقون على تقديم معلومات الشراء والحساب الحالية والكاملة والدقيقة لجميع المشتريات التي تتم في متجرنا." 
      : "We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.",
    thirdParty: isAr 
      ? "قد تشمل بعض المحتويات والمنتجات والخدمات المتاحة عبر خدمتنا مواد من أطراف ثالثة. قد توجهكم روابط الأطراف الثالثة الموجودة على هذا الموقع إلى مواقع ويب تابعة لأطراف ثالثة غير تابعة لنا. نحن لسنا مسؤولين عن فحص أو تقييم المحتوى أو الدقة ولا نضمن ولن نتحمل أي مسؤولية عن أي مواد أو مواقع ويب خاصة بأطراف ثالثة." 
      : "Certain content, products, and services available via our service may include materials from third parties. Third party links on this site may direct you to third party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third party materials or websites.",
    comments: isAr 
      ? "إذا قمت بإرسال أفكار إبداعية أو اقتراحات أو مقترحات أو خطط أو مواد أخرى، سواء عبر الإنترنت أو عبر البريد الإلكتروني أو البريد العادي أو غير ذلك، فإنك توافق على أنه يجوز لنا، في أي وقت ودون قيود، تحرير ونسخ ونشر وتوزيع وترجمة واستخدام أي تعليقات ترسلها إلينا في أي وسيط. لسنا ولن نكون ملزمين بالحفاظ على سرية أي تعليقات، أو دفع تعويض عنها، أو الرد عليها." 
      : "If you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise, you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate, and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation to maintain any comments in confidence, to pay compensation for any comments, or to respond to any comments.",
    personal: isAr 
      ? "تخضع عملية تقديم معلوماتكم الشخصية عبر المتجر لسياسة الخصوصية الخاصة بنا." 
      : "Your submission of personal information through the store is governed by our privacy policy.",
    errors: isAr 
      ? "في بعض الأحيان قد تكون هناك معلومات على موقعنا أو في الخدمة تحتوي على أخطاء مطبعية أو عدم دقة أو سهو قد يتعلق بأوصاف المنتج والأسعار والعروض الترويجية والرسوم وتوافر الشحن. نحتفظ بالحق في تصحيح أي أخطاء أو عدم دقة أو سهو وتغيير أو تحديث المعلومات أو إلغاء الطلبات إذا كانت أي معلومات في الخدمة غير دقيقة في أي وقت دون إشعار مسبق." 
      : "Occasionally there may be information on our site or in the service that contains typographical errors, inaccuracies, or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times, and availability. We reserve the right to correct any errors, inaccuracies, or omissions, and to change or update information or cancel orders if any information in the service or on any related website is inaccurate at any time without prior notice.",
    disclaimer: isAr 
      ? "نحن لا نضمن أو نتعهد بأن استخدامكم لخدمتنا سيكون دون انقطاع أو في الوقت المناسب أو آمناً أو خالياً من الأخطاء. توافقون على أنه يجوز لنا من وقت لآخر إزالة الخدمة لفترات زمنية غير محددة أو إلغاء الخدمة في أي وقت دون إشعاركم. لا نتحمل نحن ولا مدرائنا أو موظفينا أو الشركات التابعة لنا المسؤولية تحت أي ظرف من الظروف عن أي ضرر مباشر أو غير مباشر أو عرضي أو تأديبي أو خاص أو تبعي من أي نوع." 
      : "We do not guarantee, represent, or warrant that your use of our service will be uninterrupted, timely, secure, or error free. You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you. In no case shall Fashion Gate Syria, our directors, officers, employees, affiliates, agents, contractors, or interns be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.",
    indemnification: isAr 
      ? "توافقون على تعويض والدفاع عن وحماية فاشن غيت سوريا والشركات التابعة لنا وشركائنا ومسؤولينا ومدرائنا وموظفينا من أي مطالبة أو طلب، بما في ذلك أتعاب المحاماة المعقولة، التي يقدمها أي طرف ثالث بسبب أو نتيجة لخرقكم لهذه الشروط أو القوانين المعمول بها." 
      : "You agree to indemnify, defend, and hold harmless Fashion Gate Syria and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, and employees, harmless from any claim or demand, including reasonable attorneys fees, made by any third party due to or arising out of your breach of these terms or the documents they incorporate by reference, or your violation of any law or the rights of a third party.",
    severability: isAr 
      ? "في حالة تحديد عدم قانونية أي بند من بنود هذه الشروط أو بطلانه أو عدم قابليته للتنفيذ، يكون هذا البند قابلاً للتنفيذ بأقصى حد يسمح به القانون المعمول به، ويُعتبر الجزء غير القابل للتنفيذ منفصلاً عن هذه الشروط، ولا يؤثر هذا التحديد على صحة وقابلية تنفيذ أي بنود أخرى متبقية." 
      : "In the event that any provision of these terms is determined to be unlawful, void, or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these terms, such determination shall not affect the validity and enforceability of any other remaining provisions.",
    termination: isAr 
      ? "تظل التزامات ومسؤوليات الأطراف المترتبة قبل تاريخ الإنهاء سارية بعد إنهاء هذه الاتفاقية لجميع الأغراض. هذه الشروط سارية المفعول ما لم ويتم إنهاؤها من قبلكم أو من قبلنا. يمكنكم إنهاء هذه الشروط في أي وقت بإخطارنا بأنكم لم تعودوا ترغبون في استخدام خدماتنا، أو عندما تتوقفون عن استخدام موقعنا." 
      : "The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes. These terms are effective unless and until terminated by either you or us. You may terminate these terms at any time by notifying us that you no longer wish to use our services, or when you cease using our site.",
    governing: isAr 
      ? "تخضع هذه الشروط وأي اتفاقيات منفصلة نقدم بموجبها الخدمات لكم وتُفسر وفقاً لقوانين الجمهورية العربية السورية. وتخضع أي نزاعات تنشأ عن استخدام هذا الموقع للاختصاص القضائي الحصري للمحاكم السورية." 
      : "These terms and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of the Syrian Arab Republic. Any disputes arising from the use of this website will be subject to the exclusive jurisdiction of the courts of Syria.",
    changes: isAr 
      ? "يمكنكم مراجعة أحدث إصدار من الشروط والأحكام في أي وقت على هذه الصفحة. نحتفظ بالحق، بمحض تقديرنا، في تحديث أو تغيير أو استبدال أي جزء من هذه الشروط عن طريق نشر التحديثات والتغييرات على موقعنا الإلكتروني. تقع على عاتقكم مسؤولية مراجعة موقعنا بشكل دوري لمعرفة التغييرات." 
      : "You can review the most current version of the terms and conditions at any time at this page. We reserve the right, at our sole discretion, to update, change, or replace any part of these terms by posting updates and changes to our website. It is your responsibility to check our website periodically for changes."
  }), [isAr]);

  // 6. Map section content items dynamically
  const sectionsContent = React.useMemo(() => {
    if (initialData?.sections && Array.isArray(initialData.sections)) {
      return initialData.sections.map((sec: any) => ({
        id: sec.sectionId,
        title: getLocalizedValue(sec.title, lang) || sec.sectionId,
        content: getLocalizedValue(sec.content, lang) || ""
      }));
    }
    // Fallback static sections content
    return [
      { id: "online-store", title: isAr ? "١. شروط المتجر الإلكتروني" : "1. Online Store Terms", content: t.onlineStore },
      { id: "general", title: isAr ? "٢. الشروط العامة" : "2. General Conditions", content: t.general },
      { id: "accuracy", title: isAr ? "٣. دقة وصلاحية المعلومات" : "3. Accuracy & Timeliness of Information", content: t.accuracy },
      { id: "modifications", title: isAr ? "٤. تعديلات الخدمة والأسعار" : "4. Modifications to the Service and Prices", content: t.modifications },
      { id: "products", title: isAr ? "٥. المنتجات والخدمات" : "5. Products and Services", content: t.products },
      { id: "billing", title: isAr ? "٦. معلومات الفواتير والحساب" : "6. Billing and Account Information", content: t.billing },
      { id: "third-party", title: isAr ? "٧. روابط الأطراف الثالثة" : "7. Third Party Links", content: t.thirdParty },
      { id: "comments", title: isAr ? "٨. تعليقات ومشاركات المستخدمين" : "8. User Comments and Submissions", content: t.comments },
      { id: "personal", title: isAr ? "٩. معلوماتك الشخصية" : "9. Personal Information", content: t.personal },
      { id: "errors", title: isAr ? "١٠. الأخطاء وعدم الدقة والسهو" : "10. Errors, Inaccuracies, and Omission", content: t.errors },
      { id: "prohibited", title: isAr ? "١١. الاستخدامات المحظورة" : "11. Prohibited Uses", content: "", isProhibited: true },
      { id: "disclaimer", title: isAr ? "١٢. إخلاء المسؤولية وحدودها" : "12. Disclaimer of Warranties and Limitation of Liability", content: t.disclaimer },
      { id: "indemnification", title: isAr ? "١٣. التعويض" : "13. Indemnification", content: t.indemnification },
      { id: "severability", title: isAr ? "١٤. الفصل والتجزئة" : "14. Severability", content: t.severability },
      { id: "termination", title: isAr ? "١٥. الإنهاء" : "15. Termination", content: t.termination },
      { id: "governing", title: isAr ? "١٦. القانون الحاكم" : "16. Governing Law", content: t.governing },
      { id: "changes", title: isAr ? "١٧. التغييرات في الشروط والأحكام" : "17. Changes to Terms and Conditions", content: t.changes },
      { id: "contact", title: isAr ? "١٨. معلومات الاتصال" : "18. Contact Information", content: "", isContact: true }
    ];
  }, [initialData, lang, isAr, t]);

  const prohibitedBullets = React.useMemo(() => [
    isAr ? "لأي غرض غير قانوني." : "For any unlawful purpose.",
    isAr ? "لحث الآخرين على أداء أو المشاركة في أي أعمال غير قانونية." : "To solicit others to perform or participate in any unlawful acts.",
    isAr ? "لمخالفة أي لوائح أو قواعد أو قوانين أو مراسيم محلية أو دولية أو فيدرالية." : "To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.",
    isAr ? "لانتهاك حقوق الملكية الفكرية الخاصة بنا أو حقوق الملكية الفكرية للآخرين." : "To infringe upon or violate our intellectual property rights or the intellectual property rights of others.",
    isAr ? "لتحميل أو نقل فيروسات أو أي نوع آخر من الأكواد الخبيثة." : "To upload or transmit viruses or any other type of malicious code."
  ], [isAr]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        #intro, #online-store, #general, #accuracy, #modifications, #products, #billing, #third-party, #comments, #personal, #errors, #prohibited, #disclaimer, #indemnification, #severability, #termination, #governing, #changes, #contact {
          scroll-margin-top: 180px !important;
        }
        @media (max-width: 900px) {
          #intro, #online-store, #general, #accuracy, #modifications, #products, #billing, #third-party, #comments, #personal, #errors, #prohibited, #disclaimer, #indemnification, #severability, #termination, #governing, #changes, #contact {
            scroll-margin-top: 110px !important;
          }
        }
      `}} />
      <Box dir={isAr ? "rtl" : "ltr"} sx={{ bgcolor: "#FAF8F5", color: "#111111", minHeight: "100vh", pt: { xs: 12, md: 16 }, pb: 10 }}>
        {/* Page Header */}
        <Container maxWidth="xl" sx={{ mb: { xs: 6, md: 8 } }}>
          <Box sx={{ borderBottom: "1px solid rgba(0,0,0,0.06)", pb: 4, display: "flex", flexDirection: "column", gap: 1.5, textAlign: isAr ? "right" : "left" }}>
            <Typography sx={{ color: "primary.main", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {updatedText}
            </Typography>
            <Typography sx={{ fontFamily: "var(--heading-font)", fontSize: { xs: 36, md: 48 }, fontWeight: 400, color: "#111111", lineHeight: 1.1 }}>
              {pageTitle}
            </Typography>
            <Typography sx={{ color: "rgba(17, 17, 17, 0.6)", fontSize: 15, maxWidth: 600, fontFamily: '"Cairo", sans-serif' }}>
              {pageSubtitle}
            </Typography>
          </Box>
        </Container>

        {/* Main Layout Grid */}
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 4, md: 8 }}>
            {/* Left Column Sticky Sidebar Index */}
            <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: "none", md: "block" } }}>
              <Stack spacing={1.5} sx={{ position: "sticky", top: 180, borderLeft: isAr ? "none" : "1.5px solid rgba(0,0,0,0.06)", borderRight: isAr ? "1.5px solid rgba(0,0,0,0.06)" : "none", pl: isAr ? 0 : 3, pr: isAr ? 3 : 0 }}>
                {dynamicSections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <Typography
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      sx={{
                        fontSize: 13.5,
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "primary.main" : "rgba(17, 17, 17, 0.5)",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        fontFamily: '"Cairo", sans-serif',
                        "&:hover": {
                          color: "primary.main"
                        }
                      }}
                    >
                      {section.title}
                    </Typography>
                  );
                })}
              </Stack>
            </Grid>

            {/* Right Column Content Panel */}
            <Grid size={{ xs: 12, md: 9 }}>
              <Stack spacing={6} sx={{ textAlign: isAr ? "right" : "left" }}>
                
                {/* 1. Attractive Premium Introduction */}
                <Stack id="intro" spacing={3} sx={{ scrollMarginTop: { xs: "110px", md: "180px" } }}>
                  <Typography variant="h5" sx={{ fontFamily: "var(--heading-font)", fontSize: 24, fontWeight: 500, color: "#111111", letterSpacing: "0.02em" }}>
                    {introTitleText}
                  </Typography>
                  <Box
                    sx={{
                      position: "relative",
                      pl: isAr ? 0 : 3.5,
                      pr: isAr ? 3.5 : 0,
                      py: 2.5,
                      bgcolor: "rgba(203, 97, 22, 0.03)",
                      borderLeft: isAr ? "none" : "3px solid #CB6116",
                      borderRight: isAr ? "3px solid #CB6116" : "none",
                      borderRadius: 0,
                      transition: "all 0.3s ease"
                    }}
                  >
                    <Typography sx={{ fontSize: 17.5, lineHeight: 1.8, color: "#111111", fontWeight: 500, fontFamily: '"Cairo", sans-serif', mb: 2, fontStyle: "italic" }}>
                      {introPara1}
                    </Typography>
                    <Typography sx={{ fontSize: 15.5, lineHeight: 1.8, color: "rgba(17, 17, 17, 0.72)", fontFamily: '"Cairo", sans-serif' }}>
                      {introPara2}
                    </Typography>
                  </Box>
                  <Divider sx={{ mt: 1 }} />
                </Stack>

                {/* 2. Dynamic Content Loop */}
                {sectionsContent.map((sec: any) => {
                  // Custom rendering for Prohibited Uses section
                  if (sec.isProhibited || sec.id === "prohibited") {
                    const prohibitedIntro = isAr 
                      ? "بالإضافة إلى المحظورات الأخرى المنصوص عليها في الشروط، يُحظر عليكم استخدام الموقع أو محتواه:"
                      : "In addition to other prohibitions as set forth in the terms, you are prohibited from using the site or its content:";
                    
                    return (
                      <Stack key={sec.id} id={sec.id} spacing={2.5}>
                        <Typography variant="h5" sx={{ fontFamily: "var(--heading-font)", fontSize: 22, color: "#111111" }}>
                          {sec.title}
                        </Typography>
                        <Typography sx={{ fontSize: 15.5, lineHeight: 1.8, color: "rgba(17, 17, 17, 0.72)", fontFamily: '"Cairo", sans-serif' }}>
                          {getLocalizedValue(sec.content, lang) || prohibitedIntro}
                        </Typography>
                        <Stack spacing={1.2} sx={{ pl: isAr ? 0 : 3, pr: isAr ? 3 : 0 }}>
                          {prohibitedBullets.map((bullet, idx) => (
                            <Typography key={idx} sx={{ fontSize: 15, color: "rgba(17, 17, 17, 0.7)", fontFamily: '"Cairo", sans-serif', display: "list-item", listStylePosition: "inside" }}>
                              {bullet}
                            </Typography>
                          ))}
                        </Stack>
                        <Divider sx={{ mt: 2 }} />
                      </Stack>
                    );
                  }

                  // Custom rendering for Contact Information section with mailto: link
                  if (sec.isContact || sec.id === "contact") {
                    return (
                      <Stack key={sec.id} id={sec.id} spacing={2.5}>
                        <Typography variant="h5" sx={{ fontFamily: "var(--heading-font)", fontSize: 22, color: "#111111" }}>
                          {sec.title}
                        </Typography>
                        <Typography sx={{ fontSize: 15.5, lineHeight: 1.8, color: "rgba(17, 17, 17, 0.72)", fontFamily: '"Cairo", sans-serif' }}>
                          {isAr ? (
                            <>
                              يجب إرسال الأسئلة المتعلقة بالشروط والأحكام إلينا على البريد الإلكتروني{" "}
                              <Box
                                component="a"
                                href="mailto:support@fashiongatesyria.com"
                                sx={{
                                  color: "primary.main",
                                  textDecoration: "underline",
                                  fontWeight: 600,
                                  transition: "color 0.2s ease",
                                  "&:hover": { color: "primary.dark" }
                                }}
                              >
                                support@fashiongatesyria.com
                              </Box>
                            </>
                          ) : (
                            <>
                              Questions about the terms and conditions should be sent to us at{" "}
                              <Box
                                component="a"
                                href="mailto:support@fashiongatesyria.com"
                                sx={{
                                  color: "primary.main",
                                  textDecoration: "underline",
                                  fontWeight: 600,
                                  transition: "color 0.2s ease",
                                  "&:hover": { color: "primary.dark" }
                                }}
                              >
                                support@fashiongatesyria.com
                              </Box>
                            </>
                          )}
                        </Typography>
                      </Stack>
                    );
                  }

                  // Standard Section Rendering
                  return (
                    <Stack key={sec.id} id={sec.id} spacing={2.5}>
                      <Typography variant="h5" sx={{ fontFamily: "var(--heading-font)", fontSize: 22, color: "#111111" }}>
                        {sec.title}
                      </Typography>
                      <Typography sx={{ fontSize: 15.5, lineHeight: 1.8, color: "rgba(17, 17, 17, 0.72)", fontFamily: '"Cairo", sans-serif' }}>
                        {sec.content}
                      </Typography>
                      <Divider sx={{ mt: 2 }} />
                    </Stack>
                  );
                })}

              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
