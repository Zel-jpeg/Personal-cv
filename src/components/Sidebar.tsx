import { navigation } from '../data/navigation';

type SidebarProps = {
  activeSection: string;
  setActiveSection: (id: string) => void;
};

export default function Sidebar({
  activeSection,
  setActiveSection,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <nav className="section-nav" aria-label="CV sections">
        <p className="eyebrow">ON THIS CV</p>
        {navigation.map((item, index) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeSection === item.id ? 'active' : undefined}
            aria-current={activeSection === item.id ? 'location' : undefined}
            onClick={() => setActiveSection(item.id)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span> {item.label}
          </a>
        ))}
      </nav>
      <div className="sidebar-note">
        <span className="note-mark" aria-hidden="true">
          &lt;/&gt;
        </span>
        <p>
          Software development,
          <br />
          thoughtful interfaces,
          <br />
          continuous learning.
        </p>
        <span className="small-label">CODING SINCE 2022</span>
      </div>
    </aside>
  );
}
