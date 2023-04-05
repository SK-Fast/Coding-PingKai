import * as logger from './logger.js'
import { writeUserData, getUserData, getUser } from './firebaseSystem.js'

/**
 * Check for user streak
 * @param {Store} The vuex store 
 * @returns 
 */
export async function checkStreak(store) {
    const user = getUser(store)

    logger.info(`Checking for streak changes..`)

    if (!user) {
        return
    }
    const DateDiff = (await import('date-diff')).default;

    const userData = await getUserData(store)

    const today = new Date()
    const latestLevelDate = userData.last_level_date.toDate()

    const diff = new DateDiff(today, latestLevelDate);
    const daySince = diff.days()

    console.log("days since latest date: ", daySince)

    if (daySince >= 2) {
        logger.info(`Streak lost! Updating data...`)

        await writeUserData(user, {
            last_level_date: today,
            streak: 0
        })

        return {streakLost: true}
    }

    return {streakLost: false}
}

export async function updateStreak(store) {
    const user = getUser(store)

    logger.info(`Checking for streak changes..`)

    if (!user) {
        return
    }

    const DateDiff = (await import('date-diff')).default;

    const userData = await getUserData(store)

    const today = new Date()
    const latestLevelDate = userData.last_level_date.toDate()

    const diff = new DateDiff(today, latestLevelDate);
    const daySince = diff.days()

    if (daySince >= 1) {
        logger.info(`Streak changes found! updating the data!`)

        let newStreakCount = userData.streak + 1

        let streakDates = []

        if (userData['streak_dates']) {
            streakDates = userData.streak_dates
        }

        streakDates = [today, ...streakDates]

        await writeUserData(user, {
            last_level_date: today,
            streak: newStreakCount,
            streak_dates: streakDates
        })

        return {streakUpdate: true, streak: newStreakCount, oldStreak: newStreakCount - 1}
    }

    return {streakUpdate: false, streak: userData.streak, oldStreak: userData.streak}    
}