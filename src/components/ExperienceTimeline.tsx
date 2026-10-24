import { experiences } from '../data/experience';

export default function ExperienceTimeline({
  headingLevel = 2,
}: {
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <ol
      className="experience-timeline"
      role="list"
      aria-label="Development experience"
    >
      {experiences.map((experience) => (
        <li className="experience-timeline-entry" key={experience.id}>
          <article aria-labelledby={`experience-${experience.id}`}>
            <p className="experience-category">
              {experience.category}
              {experience.duration && <> · {experience.duration}</>}
            </p>
            <Heading id={`experience-${experience.id}`}>
              {experience.title}
            </Heading>
            <p className="experience-context">{experience.context}</p>
            <ul className="experience-points">
              {experience.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ol>
  );
}
