import { ApiGatewayEvent } from '../common/apigateway/apigateway-event';
import { ApiGatewayResponse } from '../common/apigateway/apigateway-response';
import { GetByIdApp } from '../apps/get-by-id-app';
import { TodoDynamoClientRepository } from '../common/repositories/todo-dynamoclient-repository';
import { LambdaApp } from '../apps/lambda-app';

/**
 * Sample Lambda function which creates an instance of a GetByIdApp and executes it.
 * The GetByIdApp evaluates the request path parameters and queries DynamoDB for the Id given.
 * 
 * @param {Object} event - Input event to the Lambda function
 *
 * @returns {Object} object - Object containing the TodoItem stored.
 * 
 */
export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
    if (!process.env['SAMPLE_TABLE']) {
        console.log('Lambda environment variables is missing the SAMPLE_TABLE variable required.');
        return { statusCode: 500 };
    }
    
    const table: string = process.env['SAMPLE_TABLE'];
    const repository = new TodoDynamoClientRepository();
    
    // We abstract all of the logic into an implementation of LambdaApp to simplify testing of the function.
    const app: LambdaApp = new GetByIdApp(table, repository);
    
    console.log('Running the GetByIdApp');
    return await app.run(event);
};