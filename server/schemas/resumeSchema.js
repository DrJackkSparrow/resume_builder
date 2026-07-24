import { z } from 'zod';

/**
 * Strict schema defining the expected shape of the ResumeData JSON.
 * We enforce string length limits to prevent abuse (e.g., extremely long inputs).
 */
export const resumeSchema = z.object({
  // In our endpoints, the resumeData might be wrapped in a 'resumeData' property or sent directly.
  // For the sake of this schema, we assume the req.body IS the resume data, or we validate req.body.resumeData
  // Let's validate the structure assuming req.body = { resumeData: { ... } } based on our pdfController.
  resumeData: z.object({
    personalInfo: z.object({
      firstName: z.string().max(100),
      lastName: z.string().max(100),
      email: z.string().email().max(255),
      phone: z.string().max(50).optional(),
      location: z.string().max(100).optional(),
      linkedin: z.string().url().max(255).optional(),
      github: z.string().url().max(255).optional(),
    }).optional(),

    objective: z.string().max(2000).optional(),

    experience: z.array(
      z.object({
        id: z.string(),
        company: z.string().max(150),
        position: z.string().max(150),
        startDate: z.string().max(50),
        endDate: z.string().max(50),
        description: z.string().max(3000),
      })
    ).optional(),

    education: z.array(
      z.object({
        id: z.string(),
        institution: z.string().max(150),
        degree: z.string().max(150),
        startDate: z.string().max(50),
        endDate: z.string().max(50),
      })
    ).optional(),

    projects: z.array(
      z.object({
        id: z.string(),
        name: z.string().max(150),
        technologies: z.string().max(300),
        description: z.string().max(3000),
        link: z.string().max(255).optional(),
      })
    ).optional(),

    skills: z.array(
      z.object({
        id: z.string(),
        category: z.string().max(100),
        items: z.string().max(1000),
      })
    ).optional(),

    sectionOrder: z.array(z.string()).optional(),
    activeTemplate: z.string().optional(),
    includeProfilePic: z.boolean().optional(),
    profilePicUrl: z.string().optional(),
  })
});
