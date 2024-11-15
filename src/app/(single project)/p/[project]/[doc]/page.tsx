//
// PLEASE SHRIT MAKE THE CODE MORE READIBLE NICER AND ADD STYLES AND STUFF
// FUTURE SHRIT
//
// dw / wfq;
"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { AppSidebar } from "@/components/project/Sidebaer/app-sidebar";
import RichText from "@/components/project/RichText";
const source = `# Forge Zone\n\nhow to move further with this?\n\n## Project Creation [Hard]\n\n- able to create new projects\n    - name, tags (language, time), image (AI), small description, able to select if the current project is featured or not\n- with each project create sections, and inner section pages\n- intersection pages will be a markdown with more options\n- maybe something like notion i want to make\n- in each project maybe i wanna have a action card, which just means to maybe input some kind of maybe variable or some kinds of thing which will mean that the user is actually working on something\n\n## User Onboard\n\n- using email get started\n- if user selects he has lot of time get the onboard in here\n- if user says not much time ask for something which is atmost needed\n- show the user how much percentage of their profile is actually completed\n- organize the routes so that it shows signed up\n- use email sign in\n\n## Work and Discover\n\n- it’s pretty easy in the dashboard have options to add more work\n- everytime a user clicks on introuduce a certain courses must be completed\n- users can easily send hi to big founders who would love to chat with them\n- **maybe have a flow for big ppl to able to join the application easily**\n- show the discover page with all the users what they’re working on and all\n\n---`;

import { useParams } from "next/navigation";
import { getProject } from "@/db/project";

const DocsPage = () => {
  const { project, doc } = useParams();
  const sub = new URLSearchParams(location.search).get("subheading");

  const [currentStep, setCurrentStep] = React.useState<any>();

  React.useEffect(() => {
    const getSteps = async () => {
      const data = await getProject(project as string);
      if (!data) return;
      setCurrentStep(data.projectsteps);
    };
    getSteps();
  }, []);

  console.log(currentStep);

  const getSourceBySlug = (data: any[], slug: string) => {
    for (const section of data) {
      const item = section.items.find((item: any) => item.slug === slug);
      if (item) {
        return item.source;
      }
    }
    return null;
  };

  return (
    <div className="px-8 md:px-16 lg:px-24 xl:px-40">
      <div className="mt-2 grid grid-cols-5 gap-x-4">
        <div className="col-span-1 ">
          {currentStep && (
            <AppSidebar steps={currentStep} projectSlug={project as string} />
          )}
        </div>

        <div className="col-span-4 ">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/p/${project}`} className="capitalize">
                  {project}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{doc}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {currentStep && (
            <RichText
              source={getSourceBySlug(currentStep, doc as string) || source}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
