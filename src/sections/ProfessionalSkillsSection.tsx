import { professionalSkillsSummary } from '../data/professionalSkills';

export default function ProfessionalSkillsSection() {
  return (
    <div className="professional-skills" id="professional-skills">
      <h3>Professional skills</h3>
      <p>{professionalSkillsSummary}</p>
    </div>
  );
}
