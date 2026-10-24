import {
  financifyRelease,
  financifyScreenshots,
  projects,
} from '../data/projects';
import MobileProjectPreview from './MobileProjectPreview';

const project = projects.find((entry) => entry.name === 'Financify')!;

export default function FinancifyProjectSection() {
  return (
    <MobileProjectPreview
      project={project}
      screenshots={financifyScreenshots}
      release={financifyRelease}
      description="A personal finance app for tracking income and expenses, allocating budgets, and reviewing spending. Explore budget-friendly recipes and convert currencies alongside your everyday money management."
    />
  );
}
