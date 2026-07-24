# DocLang

A TypeScript library for creating professional Microsoft Word resumes using semantic components.

## Install

```bash
npm install doclang
# or
pnpm add doclang
```

## CDN Usage

### Option 1: Using a Bundled Version (Recommended for Browsers)

First, build the browser bundle:

```bash
npm run build:browser
```

This creates `packages/main/dist/doclang.min.js` which you can include in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Resume Generator</title>
</head>
<body>
    <button onclick="generateResume()">Generate Resume</button>
    
    <script src="./packages/main/dist/doclang.min.js"></script>
    <script>
        async function generateResume() {
            const { Resume, Header, Name, Designation, Contact, Summary, Experience, ExperienceItem, Skills, Skill } = DocLang;
            const { Packer } = DocLang.docx;
            
            const resume = Resume(
                Header(
                    Name("John Doe"),
                    Designation("Software Engineer"),
                    Contact({
                        email: "john@example.com",
                        phone: "+1 234 567 890"
                    })
                ),
                Summary("Passionate software engineer with experience building scalable applications."),
                Experience(
                    ExperienceItem({
                        company: "ABC Technologies",
                        designation: "Frontend Developer",
                        duration: "2023 - Present",
                        points: ["Developed React applications", "Improved performance"]
                    })
                ),
                Skills(
                    Skill("TypeScript"),
                    Skill("React"),
                    Skill("Node.js")
                )
            );
            
            const buffer = await Packer.toBuffer(resume);
            const blob = new Blob([buffer], { 
                type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume.docx';
            a.click();
            URL.revokeObjectURL(url);
        }
    </script>
</body>
</html>
```

### Option 2: Using ES Modules via CDN

You can use the library directly via ES modules with import maps:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Resume Generator</title>
    <script type="importmap">
    {
        "imports": {
            "doclang": "https://unpkg.com/doclang@latest/dist/index.js",
            "docx": "https://unpkg.com/docx@latest/build/index.js"
        }
    }
    </script>
</head>
<body>
    <script type="module">
        import { Resume, Header, Name, Designation, Contact, Summary, Experience, ExperienceItem, Skills, Skill } from 'doclang';
        import { Packer } from 'docx';
        
        // ... rest of the code
    </script>
</body>
</html>
```

**Note:** For Option 2, the library must be published to npm first, and the URLs need to point to a CDN that supports ES modules.

### Option 3: Using a CDN Service

After publishing to npm, you can use services like:

- **unpkg**: `https://unpkg.com/doclang@latest/dist/doclang.min.js`
- **jsDelivr**: `https://cdn.jsdelivr.net/npm/doclang@latest/dist/doclang.min.js`
- **esm.sh**: `https://esm.sh/doclang` (for ES modules)

## Quick Start

```ts
import {
  Resume,
  Header,
  Name,
  Designation,
  Contact,
  Summary,
  Experience,
  ExperienceItem,
  Skills,
  Skill,
  Education,
  EducationItem,
  exportFile,
} from "doclang";

const resume = Resume(
  Header(
    Name("John Doe"),
    Designation("Software Engineer"),
    Contact({
      email: "john@example.com",
      phone: "+91xxxxxxxxxx",
    })
  ),

  Summary(
    "Passionate software engineer with experience building scalable applications."
  ),

  Experience(
    ExperienceItem({
      company: "ABC Technologies",
      designation: "Frontend Developer",
      duration: "2023 - Present",
      points: [
        "Developed React applications",
        "Improved application performance",
      ],
    })
  ),

  Skills(
    Skill("TypeScript"),
    Skill("React"),
    Skill("Node.js")
  ),

  Education(
    EducationItem({
      degree: "B.Tech Computer Science",
      institution: "XYZ University",
      year: "2023",
    })
  )
);

// Save as DOCX
await exportFile(resume, { fileName: "john_doe" });

// Save as DOCX + PDF (requires LibreOffice)
await exportFile(resume, { fileName: "john_doe", pdf: true });
```

## Components

### Root

| Component | Description |
|-----------|-------------|
| `Resume(...sections)` | Assembles all sections into a `docx.Document` |

### Generic

| Component | Description |
|-----------|-------------|
| `Heading(text)` | Large heading paragraph |
| `SubHeading(text)` | Sub-heading paragraph |
| `SectionHeading(text)` | Section heading with accent color |
| `Text(text)` | Normal text paragraph |
| `SmallText(text)` | Small secondary text |
| `Bullet(text)` | Single bullet point |
| `BulletList(items)` | Multiple bullet points |
| `Divider()` | Horizontal divider line |
| `Spacer(points?)` | Vertical spacing |

### Header

| Component | Description |
|-----------|-------------|
| `Header(...children)` | Container for header content |
| `Name(text)` | Candidate name (large, centered) |
| `Designation(text)` | Professional title |
| `Contact(info)` | Contact line with pipe separators |
| `Address(text)` | Address in small text |
| `Photo(config)` | Photo image |

### Profile

| Component | Description |
|-----------|-------------|
| `Summary(text)` | Professional summary |
| `Objective(text)` | Career objective |

### Experience

| Component | Description |
|-----------|-------------|
| `Experience(...items)` | Container for experience entries |
| `ExperienceItem(config)` | Entry with company, designation, duration, points |
| `Company(name)` | Company name standalone |
| `Duration(text)` | Duration standalone |

### Education

| Component | Description |
|-----------|-------------|
| `Education(...items)` | Container for education entries |
| `EducationItem(config)` | Entry with degree, institution, year |
| `Institution(name)` | Institution name standalone |
| `Degree(name)` | Degree name standalone |

### Skills

| Component | Description |
|-----------|-------------|
| `Skills(...items)` | Container for skills |
| `Skill(name)` | Single skill item |

### Projects

| Component | Description |
|-----------|-------------|
| `Projects(...items)` | Container for projects |
| `Project(config)` | Entry with name, description, points |

### Certifications

| Component | Description |
|-----------|-------------|
| `Certifications(...items)` | Container for certifications |
| `Certification(config)` | Entry with name, issuer, date |

### Languages

| Component | Description |
|-----------|-------------|
| `Languages(...items)` | Container for languages |
| `Language(config)` | Entry with name, proficiency |

### Awards

| Component | Description |
|-----------|-------------|
| `Awards(...items)` | Container for awards |
| `Award(config)` | Entry with title, date, issuer |

### References

| Component | Description |
|-----------|-------------|
| `References(...items)` | Container for references |
| `Reference(config)` | Entry with name, title, company, email, phone |

## Styling

All typography is centralized in a style system. Override any token via `createStyles`:

```ts
import { createStyles, Resume, Header, Name } from "doclang";

const customStyles = createStyles({
  heading: { color: "FF0000", size: 32 },
  name: { font: "Georgia" },
});

const resume = Resume(
  Header(Name("John Doe", customStyles)),
  // ...
);
```

### Style Tokens

| Token | Used By |
|-------|---------|
| `heading` | `Heading` |
| `subHeading` | `SubHeading` |
| `sectionHeading` | `SectionHeading` |
| `name` | `Name` |
| `designation` | `Designation`, `ExperienceItem`, `EducationItem` |
| `text` | `Text`, `Summary`, `Objective` |
| `smallText` | `SmallText`, `Address` |
| `bullet` | `Bullet`, `BulletList` |
| `company` | `Company`, `Institution`, `Skill`, `Project`, `Certification`, `Language`, `Award` |
| `duration` | `Duration`, experience/education/certification/award dates |
| `contact` | `Contact` |
| `skill` | `Skill` |

## Project Structure

```
packages/main/src/
├── types/index.ts          # TypeScript interfaces
├── styles/index.ts         # Centralized style tokens
├── core/index.ts           # Docx primitives
├── utils/index.ts          # Utility helpers
├── components/
│   ├── generic.ts          # Heading, Text, Bullet, Divider, Spacer, etc.
│   ├── header.ts           # Header, Name, Designation, Contact, etc.
│   ├── profile.ts          # Summary, Objective
│   ├── experience.ts       # Experience, ExperienceItem
│   ├── education.ts        # Education, EducationItem
│   ├── skills.ts           # Skills, Skill
│   ├── projects.ts         # Projects, Project
│   ├── certifications.ts   # Certifications, Certification
│   ├── languages.ts        # Languages, Language
│   ├── awards.ts           # Awards, Award
│   ├── references.ts       # References, Reference
│   └── resume.ts           # Resume root component
├── components.test.ts      # Tests
└── index.ts                # Public exports
```

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Type check
pnpm lint

# Build
pnpm build
```

## License

MIT
