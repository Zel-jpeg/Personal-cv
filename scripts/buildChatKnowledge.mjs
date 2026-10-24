import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'vite';
import { format, resolveConfig } from 'prettier';

// Load the existing typed portfolio data with Vite's asset transforms. Project
// photos, private certificate paths, and credentials never enter this snapshot.
const server = await createServer({
  configFile: false,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});
try {
  const cv = await server.ssrLoadModule('/src/data/cv.ts');
  const { projects } = await server.ssrLoadModule('/src/data/projects.ts');
  const { professionalSkills } = await server.ssrLoadModule(
    '/src/data/professionalSkills.ts',
  );
  const { communityEntries } = await server.ssrLoadModule(
    '/src/data/community.ts',
  );
  const { certifications } = await server.ssrLoadModule(
    '/src/data/certifications.ts',
  );
  const facts = {
    name: 'Azel Villanueva',
    nickname: 'Zel',
    location: 'Davao City, Philippines',
    title: cv.professionalTitle,
    introduction: cv.introduction,
    education: cv.education,
    skillGroups: cv.skillGroups,
    professionalSkills,
    projects: projects.map(
      ({
        name,
        category,
        description,
        technologies,
        repository,
        demo,
        details,
      }) => ({
        name,
        category,
        description,
        technologies,
        repository,
        ...(demo && { demo }),
        ...(details && { details }),
      }),
    ),
    community: communityEntries.map(({ title, description }) => ({
      title,
      description,
    })),
    certifications: certifications.map(({ title, issuer, date }) => ({
      title,
      issuer,
      date,
    })),
  };
  const output = 'src/data/chatKnowledge.json';
  const content = await format(JSON.stringify(facts), {
    ...(await resolveConfig(process.cwd())),
    parser: 'json',
  });
  // Do not reset an open development chat by rewriting unchanged knowledge.
  if (!existsSync(output) || readFileSync(output, 'utf8') !== content) {
    writeFileSync(output, content);
  }
  console.log('Chat knowledge refreshed from public portfolio data.');
} finally {
  await server.close();
}
