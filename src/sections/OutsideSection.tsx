import PhotoStack from '../components/PhotoStack';
import { hobbies, outsideIntro } from '../data/personal';

export default function OutsideSection() {
  return (
    <section
      className="cv-section outside-section reveal"
      id="outside"
      aria-labelledby="outside-title"
    >
      <div className="outside-copy">
        <p className="eyebrow">THE PERSON BEHIND THE PROJECTS</p>
        <h2 id="outside-title">
          Outside the IDE<span className="heading-dot">.</span>
        </h2>
        <p>{outsideIntro}</p>
        {hobbies.length > 0 && (
          <ul className="skill-tags">
            {hobbies.map((hobby) => (
              <li key={hobby}>{hobby}</li>
            ))}
          </ul>
        )}
      </div>
      <PhotoStack />
    </section>
  );
}
