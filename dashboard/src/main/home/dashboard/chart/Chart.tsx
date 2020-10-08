import React, { Component } from 'react';
import styled from 'styled-components';

import { ChartType } from '../../../../shared/types';

type PropsType = {
  chart: ChartType
};

type StateType = {
};

export default class Chart extends Component<PropsType, StateType> {
  state = {
    expand: false,
  }

  renderIcon = () => {
    let { chart } = this.props;

    if (chart.chart.metadata.icon && chart.chart.metadata.icon !== '') {
      return <Icon src={chart.chart.metadata.icon} />
    } else {
      return <i className="material-icons">tonality</i>
    }
  }

  readableDate = (s: string) => {
    let ts = new Date(s);
    let date = ts.toLocaleDateString();
    let time = ts.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    return `${time} on ${date}`;
  }

  render() {
    let { chart } = this.props;
    return ( 
      <StyledChart
        onMouseEnter={() => this.setState({ expand: true })}
        onMouseLeave={() => this.setState({ expand: false })}
        expand={this.state.expand}
      >
        <Title>
          <IconWrapper>
            {this.renderIcon()}
          </IconWrapper>
          {chart.name}
        </Title>

        <InfoWrapper>
          <StatusIndicator>
            <StatusColor status={chart.info.status} />
            {chart.info.status}
          </StatusIndicator>

          <LastDeployed>
            <Dot>•</Dot> Last deployed {this.readableDate(chart.info.last_deployed)}
          </LastDeployed>
        </InfoWrapper>

        <Version>v{chart.version}</Version>

        <TagWrapper>
          Namespace
          <NamespaceTag>
            {chart.namespace}
          </NamespaceTag>
        </TagWrapper>
      </StyledChart>
    );
  }
}

const Version = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 12px;
  color: #aaaabb;
`;

const Dot = styled.div`
  margin-right: 9px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const LastDeployed = styled.div`
  font-size: 13px;
  margin-left: 10px;
  margin-top: -1px;
  display: flex;
  align-items: center;
  color: #aaaabb66;
`;

const TagWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff44;
  border: 1px solid #ffffff44;
  border-radius: 3px;
  padding-left: 5px;
`;

const NamespaceTag = styled.div`
  height: 20px;
  margin-left: 6px;
  color: #aaaabb;
  background: #ffffff22;
  border-radius: 3px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 6px;
  padding-left: 7px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

const Icon = styled.img`
  width: 100%;
`;

const IconWrapper = styled.div`
  color: #efefef;
  background: none;
  font-size: 16px;
  top: 11px;
  left: 14px;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  position: absolute;

  > i {
    font-size: 17px;
    margin-top: -1px;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  height: 20px;
  font-size: 13px;
  flex-direction: row;
  text-transform: capitalize;
  align-items: center;
  font-family: 'Hind Siliguri', sans-serif;
  margin-left: 20px;
  color: #aaaabb;
  animation: fadeIn 0.5s;

  @keyframes fadeIn {
    from { opacity: 0 }
    to { opacity: 1 }
  }
`;

const StatusColor = styled.div`
  margin-bottom: 1px;
  width: 8px;
  height: 8px;
  background: ${(props: { status: string }) => (props.status === 'deployed' ? '#4797ff' : props.status === 'failed' ? "#ed5f85" : "#f5cb42")};
  border-radius: 20px;
  margin-right: 16px;
`;

const Title = styled.div`
  position: relative;
  text-decoration: none;
  padding: 12px 35px 12px 45px;
  font-size: 14px;
  font-family: 'Work Sans', sans-serif;
  font-weight: 500;
  color: #ffffff;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  animation: fadeIn 0.5s;

  >img {
    background: none;
    top: 12px;
    left: 13px;

    padding: 5px 4px;
    width: 24px;
    position: absolute;
  }
`;

const StyledChart = styled.div`
  background: #26282f;
  cursor: pointer;
  margin-bottom: 25px;
  padding: 1px;
  border-radius: 5px;
  box-shadow: 0 5px 8px 0px #00000033;
  position: relative;
  border: 2px solid #9EB4FF00;
  width: calc(100% + 2px);
  height: calc(100% + 2px);

  animation: ${(props: { expand: boolean }) => props.expand ? 'expand' : 'shrink'} 0.12s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;

  @keyframes expand {
    from { 
      width: calc(100% + 2px); 
      padding-top: 4px;
      padding-bottom: 15px;
      margin-left: 0px;
      box-shadow: 0 5px 8px 0px #00000033;
      padding-left: 1px;
      margin-bottom: 25px;
      margin-top: 0px;
    }
    to {
      width: calc(100% + 22px);
      padding-top: 7px;
      padding-bottom: 20px;
      margin-left: -10px; 
      box-shadow: 0 8px 20px 0px #00000030;
      padding-left: 5px;
      margin-bottom: 21px;
      margin-top: -4px;
    }
  }

  @keyframes shrink {
    from { 
      width: calc(100% + 22px);
      padding-top: 7px;
      padding-bottom: 20px;
      margin-left: -10px; 
      box-shadow: 0 8px 20px 0px #00000030;
      padding-left: 5px;
      margin-bottom: 21px;
      margin-top: -4px;
    }
    to {
      width: calc(100% + 2px); 
      padding-top: 4px;
      padding-bottom: 15px;
      margin-left: 0px; 
      box-shadow: 0 5px 8px 0px #00000033;
      padding-left: 1px;
      margin-bottom: 25px;
      margin-top: 0px;
    }
  }
`;
