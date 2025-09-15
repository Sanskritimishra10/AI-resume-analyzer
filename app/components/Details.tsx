import { cn } from "~/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
    return (
        <div
            className={cn(
                "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
                score > 69
                    ? "bg-badge-green"
                    : score > 39
                        ? "bg-badge-yellow"
                        : "bg-badge-red"
            )}
        >
            <img
                src={
                    score > 69
                        ? "/public/public/icons/check.svg"
                        : "/public/public/icons/warning.svg"
                }
                alt="score"
                className="size-4"
            />
            <p
                className={cn(
                    "text-sm font-medium",
                    score > 69
                        ? "text-badge-green-text"
                        : score > 39
                            ? "text-badge-yellow-text"
                            : "text-badge-red-text"
                )}
            >
                {score}/100
            </p>
        </div>
    );
};

const CategoryHeader = ({
                            title,
                            categoryScore,
                        }: {
    title: string;
    categoryScore?: number;
}) => {
    if (categoryScore === undefined) return null;

    return (
        <div className="flex flex-row gap-4 items-center py-2">
            <p className="text-2xl font-semibold">{title}</p>
            <ScoreBadge score={categoryScore} />
        </div>
    );
};

const CategoryContent = ({
                             tips,
                         }: {
    tips?: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
    if (!tips || tips.length === 0) {
        return (
            <p className="text-gray-500 italic px-4 py-2">No feedback available.</p>
        );
    }

    return (
        <div className="flex flex-col gap-4 items-center w-full">
            <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                    <div className="flex flex-row gap-2 items-center" key={index}>
                        <img
                            src={
                                tip.type === "good"
                                    ? "/public/public/icons/check.svg"
                                    : "/public/public/icons/warning.svg"
                            }
                            alt="score"
                            className="size-5"
                        />
                        <p className="text-xl text-gray-500 ">{tip.tip}</p>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-4 w-full">
                {tips.map((tip, index) => (
                    <div
                        key={index + tip.tip}
                        className={cn(
                            "flex flex-col gap-2 rounded-2xl p-4",
                            tip.type === "good"
                                ? "bg-green-50 border border-green-200 text-green-700"
                                : "bg-yellow-50 border border-yellow-200 text-yellow-700"
                        )}
                    >
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src={
                                    tip.type === "good"
                                        ? "/public/public/icons/check.svg"
                                        : "/public/public/icons/warning.svg"
                                }
                                alt="score"
                                className="size-5"
                            />
                            <p className="text-xl font-semibold">{tip.tip}</p>
                        </div>
                        <p>{tip.explanation}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <Accordion>
                {feedback.toneAndStyle && (
                    <AccordionItem id="tone-style">
                        <AccordionHeader itemId="tone-style">
                            <CategoryHeader
                                title="Tone & Style"
                                categoryScore={feedback.toneAndStyle.score}
                            />
                        </AccordionHeader>
                        <AccordionContent itemId="tone-style">
                            <CategoryContent tips={feedback.toneAndStyle.tips} />
                        </AccordionContent>
                    </AccordionItem>
                )}

                {feedback.content && (
                    <AccordionItem id="content">
                        <AccordionHeader itemId="content">
                            <CategoryHeader
                                title="Content"
                                categoryScore={feedback.content.score}
                            />
                        </AccordionHeader>
                        <AccordionContent itemId="content">
                            <CategoryContent tips={feedback.content.tips} />
                        </AccordionContent>
                    </AccordionItem>
                )}

                {feedback.structure && (
                    <AccordionItem id="structure">
                        <AccordionHeader itemId="structure">
                            <CategoryHeader
                                title="Structure"
                                categoryScore={feedback.structure.score}
                            />
                        </AccordionHeader>
                        <AccordionContent itemId="structure">
                            <CategoryContent tips={feedback.structure.tips} />
                        </AccordionContent>
                    </AccordionItem>
                )}

                {feedback.skills && (
                    <AccordionItem id="skills">
                        <AccordionHeader itemId="skills">
                            <CategoryHeader
                                title="Skills"
                                categoryScore={feedback.skills.score}
                            />
                        </AccordionHeader>
                        <AccordionContent itemId="skills">
                            <CategoryContent tips={feedback.skills.tips} />
                        </AccordionContent>
                    </AccordionItem>
                )}

                {feedback.ATS && (
                    <AccordionItem id="ats">
                        <AccordionHeader itemId="ats">
                            <CategoryHeader title="ATS" categoryScore={feedback.ATS.score} />
                        </AccordionHeader>
                        <AccordionContent itemId="ats">
                            {/* ATS tips don’t have explanation in your type → fallback */}
                            <div className="flex flex-col gap-2 px-4 py-2">
                                {feedback.ATS.tips.map((tip, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "flex flex-row gap-2 items-center",
                                            tip.type === "good" ? "text-green-600" : "text-yellow-600"
                                        )}
                                    >
                                        <img
                                            src={
                                                tip.type === "good"
                                                    ? "/public/public/icons/check.svg"
                                                    : "/public/public/icons/warning.svg"
                                            }
                                            alt="tip"
                                            className="size-5"
                                        />
                                        <p>{tip.tip}</p>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )}
            </Accordion>
        </div>
    );
};

export default Details;
