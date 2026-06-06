import { DataController } from "../controllers/dataController.js";

async function test() {
    console.log("Instantiating DataController...");

    const controller = new DataController();

    try {
        console.log("Fetching trees with query 'TEST'...");

        const testTrees = await controller.fetchTrees("TEST");

        console.log(`Successfully fetched ${testTrees.length} trees for 'TEST'.`);

        if (testTrees.length > 0) {
            console.log("Sample tree matching 'TEST':", testTrees[0]);
        }

        console.log("Fetching default trees...");

        const defaultTrees = await controller.fetchTrees("");

        console.log(`Successfully fetched ${defaultTrees.length} default trees.`);

        if (defaultTrees.length > 0) {
            console.log("Sample default tree:", defaultTrees[0]);
        }

    } catch (err) {
        console.error("Verification test failed:", err);
    }
}

test();