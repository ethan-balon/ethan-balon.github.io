import { DataController } from "../controllers/dataController.js";

async function test() {
    console.log("Instantiating DataController...");
    const controller = new DataController();

    try {
        const testQuery = 'Apricot'
        const testTrees = await controller.fetchTrees(testQuery);
        console.log(`Successfully fetched ${testTrees.length} trees for ${testQuery}.`);
        if (testTrees.length > 0) {
            console.log(`Sample tree matching ${testQuery}:`, testTrees[0]);
        }
        console.log(testTrees)

        //check seasonality
        console.log(`Season of ${testQuery}: ${await controller.determineSeasonality(testQuery)}`)

        //what happens when user requests all tree types
        console.log("Fetching default trees...");
        const defaultTrees = await controller.fetchTrees("");
        console.log(`Successfully fetched ${defaultTrees.length} default trees.`);
        if (defaultTrees.length > 0) {
            console.log("Sample default tree:", defaultTrees[0]);
        }
        console.log(defaultTrees)


        
    } catch (err) {
        console.error("Verification test failed:", err);
    }
}

test();
