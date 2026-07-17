import type { ResumeAnalysis } from "../types/resume";

export async function analyzeResume(){

    const data:ResumeAnalysis={

        score:91,

        strengths:[
            "Strong React knowledge",
            "Good DSA Profile",
            "Good Projects"
        ],

        missingKeywords:[
            "Docker",
            "Redis",
            "AWS",
            "CI/CD"
        ],

        suggestions:[
            "Add quantified achievements.",
            "Improve project descriptions.",
            "Include backend technologies."
        ]

    };

    return new Promise<ResumeAnalysis>((resolve)=>{

        setTimeout(()=>{

            resolve(data);

        },1500);

    });

}