'use strict';

const sinon = require('sinon');

module.exports = (service, stageName, deploymentKey, stageSettings) => ({
    service: {
        service: service,
        provider: {
            compiledCloudFormationTemplate: {
                Resources: {
                    [deploymentKey]: {
                        Type: 'AWS::ApiGateway::Deployment',
                        StageName: 'dev',
                        Properties: {
                            StageName: stageName
                        }
                    }
                }
            }
        },
        custom: {
            stageSettings: stageSettings
        }
    },
    getProvider: () => ({
      getStage: () => stageName,
      getRegion: () => 'test-region',
    }),
    cli: {
        log: sinon.spy()
    }
});
