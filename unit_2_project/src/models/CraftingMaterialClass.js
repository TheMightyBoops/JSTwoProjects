/**
 * This class contains the model class for the items
 * players use to upgrade their weapons
 *
 * Lucas Nolting
 * 3/16/2019
 */
class CraftingMaterial {
    constructor(name, isOrganicMaterial, experience) {

        this._name = name;
        this._isOrganicMaterial = isOrganicMaterial;
        this._experience = experience;

        //organic materials have lower exp amts, but can increase a weapon multiplier
        if(isOrganicMaterial === true) {
            this._multiplier = .25;
        } else {
            this._multiplier = 0;
        }


    }

    //accessors
    get name() {
        return this._name;
    }

    get isOrganicMaterial() {
        return this._isOrganicMaterial;
    }

    get experience() {
        return this._experience;
    }

    get multiplier() {
        return this._multiplier;
    }
}
