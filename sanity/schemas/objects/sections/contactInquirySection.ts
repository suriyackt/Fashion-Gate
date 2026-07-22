import { defineField, defineType } from 'sanity'
import { HelpCircle } from 'lucide-react'

export const contactInquirySection = defineType({
  name: 'contactInquirySection',
  title: 'Contact Inquiry Section',
  type: 'object',
  icon: HelpCircle,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'localizedString',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localizedText',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'buttonPath',
      title: 'Button Link Path',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'modelImage',
      title: 'Model Showcase Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'headline.en',
      subtitle: 'eyebrow.en',
      enabled: 'enabled',
    },
    prepare({ title, subtitle, enabled }) {
      return {
        title: title || 'Contact Inquiry Section',
        subtitle: `${enabled === false ? 'Disabled' : 'Enabled'} — ${subtitle || ''}`,
      }
    },
  },
})
