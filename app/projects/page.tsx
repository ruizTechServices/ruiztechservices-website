// app/projects/page.tsx

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

//THis is the projects page server component
export default function ProjectsPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-400">
            <h1>Projects</h1>
            <p>Here are some of the projects I have worked on:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8 animate-fade-in">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <CardHeader>
                        <CardTitle>Input</CardTitle>
                        <CardDescription>Input</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Project details and information go here.</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button asChild variant="outline">
                            <Link href="/testing-grounds">View Details</Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <CardHeader>
                        <CardTitle>Project Two</CardTitle>
                        <CardDescription>A brief description of the second project</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Project details and information go here.</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">View Details</Button>
                        <Button>Live Demo</Button>
                    </CardFooter>
                </Card>

                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <CardHeader>
                        <CardTitle>Project Three</CardTitle>
                        <CardDescription>A brief description of the third project</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Project details and information go here.</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">View Details</Button>
                        <Button>Live Demo</Button>
                    </CardFooter>
                </Card>
            </div>

        </main>
    );
}
