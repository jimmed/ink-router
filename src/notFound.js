import { h, Text, Indent } from 'ink'

const NotFound = ({ location = {}, children = [] }) => (
  <div>
    <div>
      <Text bold red underline>
        Route not found!
      </Text>
    </div>
    <br />
    <div>
      <Text white>
        No route was found that matches the path:{' '}
        {inspect(location.pathname, { colors: true })}
      </Text>
    </div>
    <br />
    <div>
      <Text bold underline white>
        Available Routes:
      </Text>
    </div>
    <br />
    <Indent size={2}>
      {children.map(({ _props: { path, exact = false } }) => (
        <div>
          <Text white>
            <Text grey>-</Text> {path}{' '}
            {exact && (
              <Text italic grey>
                (exact)
              </Text>
            )}
          </Text>
        </div>
      ))}
    </Indent>
  </div>
)

export default NotFound
