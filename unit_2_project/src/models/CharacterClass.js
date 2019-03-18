/**
 * This class is all attributes that make up a character; in FFXIII
 * a character has 2 stats that are affected by the items they have equipped,
 * while most rpg's would have armor this stat is simply derived from the same
 * number that calculates damage (both magic or physical).
 *
 * Lucas Nolting
 * 3/16/2019
 */
class Character {
    constructor(basePhysical, baseMagic, equippedWeapon) {
        this._basePhysical = basePhysical;
        this._baseMagic = baseMagic;
        this._equippedWeapon = equippedWeapon;
        this._derivedPhysical = 0;
        this._derivedMagic = 0;

    }

    //accessors
    get basePhysical() {
        return this._basePhysical;
    }

    get baseMagic() {
        return this._baseMagic;
    }


    get equippedWeapon() {
        return this._equippedWeapon;
    }


    get derivedPhysical() {
        return this._derivedPhysical;
    }

    get derivedMagic() {
        return this._derivedMagic;
    }

//equipped weapons need to be changed on the fly,
    set equippedWeapon(value) {
        this._equippedWeapon = value;
    }


    set derivedPhysical(value) {
        this._derivedPhysical = value;
    }set basePhysical(value) {
        this._basePhysical = value;
    }

    set baseMagic(value) {
        this._baseMagic = value;
    }

    set derivedMagic(value) {
        this._derivedMagic = value;
    }

//methods calculate derived stats when weapon is equipped
    calculateDerivedStats() {
        if(this.equippedWeapon !== null) {
            try {
                this.derivedPhysical = this.baseMagic
                    + this.equippedWeapon.weaponPhysical;

                this.derivedMagic = this.basePhysical
                    + this.equippedWeapon.weaponMagic;

            } catch (e) {
                console.log(e.error())
            }
        }
    }
}