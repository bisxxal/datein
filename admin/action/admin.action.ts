'use server';

import prisma from "@/lib/prisma";

export const getForVerification = async () => {
    try {
        const data = await prisma.verified.findMany({})
        return data;
    } catch (error) {

    }
}
export const getUser = async (userId: string) => {
    try {
        const data = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                name: true,
                email: true,
                photos: {
                    select: {
                        url: true
                    }
                },
                profile:{
                    select:{
                        age: true,
                    batch: true
                    }
                }

            }
        });
        return data;
    } catch (error) {

    }
}
export const verifyUser = async (userId: string, id: string) => {
    try {


        if (!userId || !id) {
            return { status: 400, message: "User ID is required" };
        }

        // Create a new verified record
        const [verified, user] = await prisma.$transaction([
            prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    verified: true,
                },
            }),
            prisma.verified.delete({
                where: {
                    id: id,
                },
            })
        ])
        if (!verified) {
            return { status: 500, message: "Failed to verify user" };
        }
        return { status: 200, message: "User verified successfully", data: verified };
    } catch (error) {

    }
}

export const deleteVerification = async (id: string) => {
    try {
        if (!id) {
            return { status: 400, message: "ID is required" };
        }
        const deletedVerification = await prisma.verified.delete({
            where: {
                id: id,
            },
        });

        if (!deletedVerification) {
            return { status: 500, message: "Failed to delete verification" };
        }
        return { status: 200, message: "Verification deleted successfully" };
    } catch (error) {

    }
}

export const getReportedUsers = async () => {
    try {

        const reportedUsers = await prisma.reportedUsers.findMany({
            select: {
                id: true,
                reason: true,
                reportedId: true,
                reporter: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        photos: true
                    }
                }
            }
        });
        return JSON.parse(JSON.stringify(reportedUsers));
    } catch (error) {
        return JSON.parse(JSON.stringify({ status: 500, message: 'Error while fetching reported users' }));
    }
};

export const getBugReports = async () => {
    try {
        const res = await prisma.bug.findMany()
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        return JSON.parse(JSON.stringify({ status: 500, message: 'Error while fetching reported users' }));
    }
}

export const fixBug = async (id: string) => {
    try {
        const res = await prisma.bug.delete({
            where: {
                id: id
            }
        });
        if (!res) {
            return JSON.parse(JSON.stringify({ status: 500, message: 'Error while fixing bug' }));
        }
        return JSON.parse(JSON.stringify({ status: 200, message: 'Bug fixed successfully' }));
    } catch (error) {
        return JSON.parse(JSON.stringify({ status: 500, message: 'Error while fixing bug' }));
        
    }
}