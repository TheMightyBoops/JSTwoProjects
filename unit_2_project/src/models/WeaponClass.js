/**
 * This class represents a skeleton of the weapons that a
 * character can equip and also can be affected by materials entered by the user.
 *
 * Lucas Nolting
 * 3/16/2019
 */

class Weapon {
    set name(value) {
        this._name = value;
    }
    constructor(name, weaponPhysical, weaponMagic, experienceToLevelUp, addedPhysicalOnLevel, addedMagicOnLevel) {
        this._name = name;
        this._weaponPhysical = weaponPhysical;
        this._weaponMagic = weaponMagic;
        this._multiplier = 1;
        //this._experienceToNextLevel = experienceToLevelUp * .1;
        this._weaponMagic = weaponMagic;
        this._experienceToLevelUp = experienceToLevelUp;
        this._name = name;
        this._level = 1;
        this._totalExperience = 0;
        this._addedPhysicalOnLevel = addedPhysicalOnLevel;
        this._addedMagicOnLevel = addedMagicOnLevel;
        this._tempExperience = 0;
    }


    get tempExperience() {
        return this._tempExperience;
    }

    set tempExperience(value) {
        this._tempExperience = value;
    }

    get name() {
        return this._name;
    }

    get weaponPhysical() {
        return this._weaponPhysical;
    }

    set weaponPhysical(value) {
        this._weaponPhysical = value;
    }

    get weaponMagic() {
        return this._weaponMagic;
    }

    set weaponMagic(value) {
        this._weaponMagic = value;
    }

    get experienceToLevelUp() {
        return this._experienceToLevelUp;
    }

    set experienceToLevelUp(value) {
        this._experienceToLevelUp = value;
    }

    get multiplier() {
        return this._multiplier;
    }


    set multiplier(value) {
        this._multiplier = value;
    }

    generateMultiplier(value, quantity) {
        //helper method
        function applyBorder(id) {
            document.getElementById(id).style.border = '2px solid #3fff35';
            document.getElementById(id).style.borderRadius = '2px / 2px';
            document.getElementById(id).style.border
        }

        function eraseBorder(id) {
            document.getElementById(id).style.border = 'none';
        }


        this._multiplier = (value * quantity) + this.multiplier;
        if (this.multiplier > 2.0) {
            this.multiplier = 2
        }


    }


    //get experienceToNextLevel() {
    //   return this._experienceToNextLevel;
    // }

    //set experienceToNextLevel(value) {
    //    this._experienceToNextLevel = value;
    //}


    get totalExperience() {
        return this._totalExperience;
    }

    set totalExperience(value) {
        this._totalExperience += value;
        let truncateLevel = (this.tempExperience + value) / this.experienceToLevelUp;
        truncateLevel = Math.trunc(truncateLevel);
        console.log(truncateLevel);
        this.level += truncateLevel;
        this.weaponMagic += (truncateLevel * this._addedMagicOnLevel);
        this.weaponPhysical += (truncateLevel * this._addedPhysicalOnLevel);

        if(value >= this.experienceToLevelUp) {
            this.tempExperience = (value) - (truncateLevel * this.experienceToLevelUp);
        } else {
            this.tempExperience =+ value;
        }
    }

    get level() {
        return this._level;
    }


    set level(value) {
        this._level = value;
    }

    checkForLevelUp() {
        let threshold = this._level * this.experienceToLevelUp; //this exp is what you would need to be this level
            //+ this.experienceToLevelUp; //plus an additional makes the threshold
        //if you can top this you have a new level
        if(this.totalExperience > threshold) {
            this.level++;
        }
    }
}