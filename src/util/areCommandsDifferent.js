module.exports = (existingCommand, localCommand) => {
    const areChoicesDifferent = (existingChoices, localChoices) => {
        for (const localChoice of localChoices) {
            const existingChoice = existingChoices ?
                existingChoices.find(choice => choice.name === localChoice.name) :
                undefined;

            if (!existingChoice) {
                return true;
            }

            if (localChoice.value !== existingChoice.value) {
                return true;
            }
        }
        return false;
    };

    const areOptionsDifferent = (existingOptions, localOptions) => {
        for (const localOption of localOptions) {
            const existingOption = existingOptions ?
                existingOptions.find(option => option.name === localOption.name) :
                undefined;

            if (!existingOption) {
                return true;
            }

            if (
                localOption.description !== existingOption.description ||
                localOption.type !== existingOption.type ||
                (localOption.required || false) !== (existingOption.required || false) ||
                (localOption.choices ? localOption.choices.length : 0) !==
                (existingOption.choices ? existingOption.choices.length : 0) ||
                areChoicesDifferent(localOption.choices || [], existingOption.choices || [])
            ) {
                return true;
            }
        }
        return false;
    };

    if (
        existingCommand.description !== localCommand.description ||
        (existingCommand.options ? existingCommand.options.length : 0) !==
        (localCommand.options ? localCommand.options.length : 0) ||
        areOptionsDifferent(existingCommand.options, localCommand.options || [])
    ) {
        return true;
    }

    return false;
};