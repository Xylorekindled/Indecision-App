import React from 'react';

import Header from './Header';
import Action from './Action';
import AddOption from './AddOption';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteSingleOption = this.handleDeleteSingleOption.bind(this);
        this.handleClearSelectedOption = this.handleClearSelectedOption.bind(this);

        this.state = {
            options: [],
            selectedOption: undefined
        };
    }

    componentWillMount()
    {
        try
        {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if(options)
            {
                this.setState(() => ({
                    options
                }));
            }
        }
        catch(e)
        {
            // Do Nothing....
        }
    }

    componentDidUpdate(prevProps, prevState)
    {
        if(prevState.options.length !== this.state.options.length)
        {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    handleDeleteOptions()
    {
        this.setState(() => ({
            options: []
        }));
    }

    handleDeleteSingleOption(optionToRemove)
    {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    }

    handlePick()
    {
        const rand = Math.floor(Math.random() * this.state.options.length);
        const opt = this.state.options[rand]
        this.setState(() => ({
            selectedOption: opt
        }));
    }

    handleClearSelectedOption()
    {
        this.setState(() => ({
            selectedOption: undefined
        }));
    }

    handleAddOption(option)
    {
        if(!option) return 'Enter valid value to add item';
        else if(this.state.options.indexOf(option) > -1) return 'This option already exists';

        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }))
    }

    render()
    {
        const subtitle = 'Let computer choose for you...';

        return (
            <div>
                <Header subtitle={subtitle}/>
                <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
                <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} handleDeleteSingleOption={this.handleDeleteSingleOption}/>
                <AddOption handleAddOption={this.handleAddOption}/>
                <OptionModal selectedOption={this.state.selectedOption} handleClearSelectedOption={this.handleClearSelectedOption}/>
            </div>
        );
    }
}