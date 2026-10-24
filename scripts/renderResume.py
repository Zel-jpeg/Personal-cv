"""Render the approved public portfolio snapshot as a two-page resume."""
import json
import sys
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    HRFlowable, KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table,
    TableStyle,
)


def safe(value):
    return escape(str(value).replace('\u2013', '-').replace('\u2014', '-'))


data = json.load(sys.stdin)
output = Path(__file__).resolve().parents[1] / 'src/assets/resume/azel-villanueva-resume.pdf'
output.parent.mkdir(parents=True, exist_ok=True)
body = ParagraphStyle('Body', fontName='Helvetica', fontSize=10, leading=12.5, spaceAfter=5)
bold = ParagraphStyle('Bold', parent=body, fontName='Helvetica-Bold', spaceAfter=1)
small = ParagraphStyle('Small', parent=body, fontSize=9, leading=11, spaceAfter=3)
italic = ParagraphStyle('Italic', parent=small, fontName='Helvetica-Oblique')
right_style = ParagraphStyle('Right', parent=italic, alignment=TA_RIGHT)
heading = ParagraphStyle('Heading', parent=bold, fontSize=11, leading=13, spaceBefore=10, spaceAfter=3)
center = ParagraphStyle('Center', parent=small, alignment=TA_CENTER, spaceAfter=1)
name = ParagraphStyle('Name', parent=center, fontName='Helvetica-Bold', fontSize=15, leading=18, spaceAfter=2)
bullet = ParagraphStyle('Bullet', parent=body, leftIndent=17, firstLineIndent=0, bulletIndent=3, spaceAfter=3)
width = letter[0] - 88 - 12
story = []


def p(text, style=body):
    return Paragraph(text, style)


def section(title):
    # Keep each heading, rule, and first entry together at page boundaries.
    title_p = p(safe(title), heading)
    title_p.keepWithNext = True
    rule = HRFlowable(width='100%', thickness=0.7, color=colors.black, spaceAfter=9)
    rule.keepWithNext = True
    story.extend([title_p, rule])


def bullets(points):
    return [Paragraph(safe(point), bullet, bulletText='\u2022') for point in points]


story.extend([
    p(safe(data['name']).upper(), name),
    p(f"<b>{safe(data['title'])}</b>", center),
    p(f"{safe(data['location'])} | {safe(data['phone'])} | "
      f"<link href='mailto:{safe(data['email'])}'>{safe(data['email'])}</link>", center),
    p(f"<link href='{safe(data['website'])}'>zeelll.vercel.app</link> | "
      f"<link href='{safe(data['github'])}'>github.com/Zel-jpeg</link>", center),
    Spacer(1, 6),
])
section('PROFESSIONAL SUMMARY')
story.append(p(safe(data['summary'])))
section('DEVELOPMENT EXPERIENCE & TRAINING')
for entry in data['experiences']:
    right = safe(entry['category'])
    if entry.get('duration'):
        right += '<br/>' + safe(entry['duration'])
    row = Table([[p(safe(entry['title']).upper(), bold), p(right, right_style)]],
                colWidths=[width * .72, width * .28])
    row.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.append(KeepTogether([row, p(safe(entry['context']), italic),
                               Spacer(1, 3), *bullets(entry['points']), Spacer(1, 7)]))
section('EDUCATION')
for entry in data['education']:
    story.extend([p(safe(entry['school']), bold), p(safe(entry['program']), bold)])
    if entry.get('period'):
        story.append(p(safe(entry['period']), small))

story.append(PageBreak())
section('SELECTED PROJECTS')
for project in data['projects']:
    story.append(KeepTogether([
        p(f"{safe(project['name'])} | {safe(project['category'])}", bold),
        p(' / '.join(safe(tech) for tech in project['technologies']), italic),
        *bullets([project['description']]),
        p(f"<link href='{safe(project['repository'])}'>{safe(project['repository'].replace('https://', ''))}</link>", small),
        Spacer(1, 7),
    ]))
section('TECHNICAL SKILLS')
for group in data['skillGroups']:
    story.append(Paragraph(f"<b>{safe(group['category'])}:</b> {safe(', '.join(group['skills']))}",
                           bullet, bulletText='\u2022'))
section('CERTIFICATIONS & TRAINING')
for cert in data['certifications']:
    story.append(KeepTogether([
        p(safe(cert['title']), bold),
        p(f"{safe(cert['issuer'])} | {safe(cert['date'])}", small),
        Spacer(1, 4),
    ]))

doc = SimpleDocTemplate(str(output), pagesize=letter, rightMargin=44, leftMargin=44,
                        topMargin=36, bottomMargin=36, title=f"{data['name']} - Resume",
                        author=data['name'], pageCompression=1)
doc.build(story)
print(f'Resume created: {output}')
