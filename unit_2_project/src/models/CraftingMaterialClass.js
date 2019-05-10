/**
 * This class contains the model class for the items
 * players use to upgrade their weapons
 *
 * Lucas Nolting
 * 3/16/2019
 */
class CraftingMaterial {
    constructor(name, isOrganicMaterial, experience, quantity, thumbnailRef) {

        this._name = name;
        this._isOrganicMaterial = isOrganicMaterial;
        this._experience = experience;
        this._quantity = quantity;
        this._thumbnailRef = thumbnailRef;

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


    get quantity() {
        return this._quantity;
    }


    set quantity(value) {
        this._quantity = value;
    }


    get thumbnailRef() {
        return this._thumbnailRef;
    }

    set thumbnailRef(value) {
        this._thumbnailRef = value;
    }
}
