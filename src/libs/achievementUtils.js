import * as logger from './logger.js'
import { writeUserData, getUserData, getUser } from './firebaseSystem.js'
import achievements from '../achievements/achievements.js'

/**
 * Give achievement to the user.
 * @param {Store} The vuex store 
 * @param {string} The Achievement ID 
 * @returns 
 */
export async function giveAchievement(store, achievementID) {
    if (!achievements[achievementID]) {
        logger.info(`The achievement ${achievementID} does not exist, cancelling action`)
        return {success: false, reason: "does_not_exist"}
    }

    const user = getUser(store)
    const userData = await getUserData(store)

    let existingAch = []

    if (!userData.achievements) {
        existingAch = []
    } else {
        existingAch = userData.achievements 
    }

    if (existingAch.includes(achievementID)) {
        logger.info(`The user already got the achievement, cancelling action`)
        return {success: false, reason: "already_exists"}
    }

    existingAch.push(achievementID)
    
    await writeUserData(user, {
        achievements: existingAch
    })

    return {success: true, data: achievements[achievementID]}
    
}