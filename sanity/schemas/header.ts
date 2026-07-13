import { defineField, defineType } from "sanity";

export const header = defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (Administrative)",
      type: "string",
      initialValue: "Main Navigation Header Settings",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "logoImage",
      title: "Logo Image",
      type: "image",
      description: "Upload a logo image (SVG or PNG). If uploaded, it will show next to the logo text."
    }),
    defineField({
      name: "logoTitle",
      title: "Logo Title (Bilingual)",
      type: "localizedString",
      description: "Bilingual text logo to display in the header (e.g., 'FASHION GATE' / 'بوابة الأزياء')."
    }),
    defineField({
      name: "showSearch",
      title: "Show Search Box",
      type: "boolean",
      initialValue: true,
      description: "Toggle whether to display the search box on the right of the header."
    }),
    defineField({
      name: "searchPlaceholder",
      title: "Search Box Placeholder (Bilingual)",
      type: "localizedString",
      description: "Custom placeholder inside search field (e.g., 'Search...' / 'ابحث...')."
    }),
    defineField({
      name: "showLanguageSwitcher",
      title: "Show Language Switcher",
      type: "boolean",
      initialValue: true,
      description: "Toggle whether to display the language switcher (AR/EN flag) in the header."
    }),
    defineField({
      name: "showUserProfile",
      title: "Show User Profile Icon",
      type: "boolean",
      initialValue: true,
      description: "Toggle whether to display the user profile button in the header."
    }),
    defineField({
      name: "searchDepartmentsHeading",
      title: "Search Departments Section Heading",
      type: "localizedString",
      description: "Bilingual heading for the category links section (e.g., 'Departments' / 'الأقسام المقتارة')."
    }),
    defineField({
      name: "searchDepartments",
      title: "Search Departments Quick Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "searchNavItem",
          title: "Search Link Item",
          fields: [
            defineField({
              name: "label",
              title: "Label (Bilingual)",
              type: "localizedString"
            }),
            defineField({
              name: "href",
              title: "Redirect Link",
              type: "string"
            })
          ]
        }
      ]
    }),
    defineField({
      name: "searchSuggestedBrandsHeading",
      title: "Search Suggested Brands Section Heading",
      type: "localizedString",
      description: "Bilingual heading for the suggested brands section (e.g., 'Suggested Brands' / 'دور الفخامة')."
    }),
    defineField({
      name: "searchSuggestedBrands",
      title: "Search Suggested Brands",
      type: "array",
      of: [{ type: "reference", to: [{ type: "brand" }] }],
      description: "Select which brands to suggest when search starts."
    }),
    defineField({
      name: "searchMatchingHeading",
      title: "Search Results Section Heading",
      type: "localizedString",
      description: "Bilingual heading for matching search results section (e.g., 'Matching Pieces' / 'النتائج المطابقة')."
    }),
    defineField({
      name: "menuItems",
      title: "Menu Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "navItem",
          title: "Navigation Item",
          fields: [
            defineField({
              name: "label",
              title: "Label (Bilingual)",
              type: "localizedString"
            }),
            defineField({
              name: "href",
              title: "Redirect Link",
              type: "string",
              description: "Example: / or /category/fashion or #brand"
            }),
            defineField({
              name: "designerCategories",
              title: "Dropdown Designer Categories",
              type: "array",
              of: [{ type: "reference", to: [{ type: "designerCategory" }] }],
              description: "Select which designer categories to show in the hover dropdown of this menu item."
            })
          ],
          preview: {
            select: {
              titleEn: "label.en",
              titleAr: "label.ar",
              href: "href",
              categories: "designerCategories"
            },
            prepare(selection) {
              const { titleEn, titleAr, href, categories } = selection;
              const count = categories ? categories.length : 0;
              return {
                title: `${titleEn || ""} / ${titleAr || ""}`,
                subtitle: `Link: ${href || ""} | Dropdown Categories: ${count}`
              };
            }
          }
        }
      ]
    })
  ]
});
