/**
 * This class represents a skeleton of the weapons that a
 * character can equip and also can be affected by materials entered by the user.
 *
 * Lucas Nolting
 * 3/16/2019
 */

class Weapon {
    constructor(name, weaponPhysical, weaponMagic, experienceToLevelUp) {
        this._name = name;
        this._weaponPhysical = weaponPhysical;
        this._weponMagic = weaponMagic;
        this._multiplyer = 0;
        this._experienceToNextLevel = experienceToLevelUp * .1;
        this._weaponMagic = weaponMagic;
        this._experienceToLevelUp = experienceToLevelUp;
        this._name = name;


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

    get multiplyer() {
        return this._multiplyer;
    }

    set multiplyer(value) {
        this._multiplyer = value;
    }

    get experienceToNextLevel() {
        return this._experienceToNextLevel;
    }

    set experienceToNextLevel(value) {
        this._experienceToNextLevel = value;
    }
}