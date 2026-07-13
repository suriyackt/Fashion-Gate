import { defineType, defineField } from "sanity";
import { Key } from "lucide-react";

export const loginPage = defineType({
  name: "loginPage",
  title: "Login Page",
  type: "document",
  icon: Key,
  fields: [
    defineField({
      name: "loginTitle",
      title: "Login Title",
      type: "localizedString",
    }),
    defineField({
      name: "signupTitle",
      title: "Signup Title",
      type: "localizedString",
    }),
    defineField({
      name: "welcomeBack",
      title: "Welcome Back Message",
      type: "localizedString",
    }),
    defineField({
      name: "welcomeNew",
      title: "Welcome New User Message",
      type: "localizedString",
    }),
    defineField({
      name: "emailLabel",
      title: "Email Label",
      type: "localizedString",
    }),
    defineField({
      name: "passwordLabel",
      title: "Password Label",
      type: "localizedString",
    }),
    defineField({
      name: "confirmPasswordLabel",
      title: "Confirm Password Label",
      type: "localizedString",
    }),
    defineField({
      name: "nameLabel",
      title: "Name Label",
      type: "localizedString",
    }),
    defineField({
      name: "loginBtn",
      title: "Login Button Label",
      type: "localizedString",
    }),
    defineField({
      name: "signupBtn",
      title: "Signup Button Label",
      type: "localizedString",
    }),
    defineField({
      name: "haveAccount",
      title: "Have Account Link Label",
      type: "localizedString",
    }),
    defineField({
      name: "noAccount",
      title: "No Account Link Label",
      type: "localizedString",
    }),
    defineField({
      name: "backHome",
      title: "Back to Home Button Label",
      type: "localizedString",
    }),
    defineField({
      name: "successMsg",
      title: "Success / Authenticating Message",
      type: "localizedString",
    }),
    defineField({
      name: "bgImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  initialValue: {
    loginTitle: { en: "Sign In", ar: "تسجيل الدخول" },
    signupTitle: { en: "Create Account", ar: "إنشاء حساب" },
    welcomeBack: { en: "Welcome back to the Boulevard", ar: "مرحباً بك مجدداً في البوليفارد" },
    welcomeNew: { en: "Join Syria's first luxury department store", ar: "انضم لأول متجر أزياء فاخر في سوريا" },
    emailLabel: { en: "Email Address", ar: "البريد الإلكتروني" },
    passwordLabel: { en: "Password", ar: "كلمة المرور" },
    confirmPasswordLabel: { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
    nameLabel: { en: "Full Name", ar: "الاسم الكامل" },
    loginBtn: { en: "Sign In", ar: "دخول" },
    signupBtn: { en: "Create Account", ar: "إنشاء الحساب" },
    haveAccount: { en: "Already have an account? Sign In", ar: "لديك حساب بالفعل؟ سجل دخولك" },
    noAccount: { en: "New to Fashion Gate? Create Account", ar: "جديد في بوابة الأزياء؟ أنشئ حساباً" },
    backHome: { en: "Back to Boulevard", ar: "العودة إلى البوليفارد" },
    successMsg: { en: "Authenticating...", ar: "جاري التحقق..." }
  },
  preview: {
    prepare() {
      return {
        title: "Login Page Settings",
        subtitle: "Manage login/signup form fields"
      };
    }
  }
});
