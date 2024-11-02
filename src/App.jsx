import { createSignal, onMount, createEffect, Show } from 'solid-js';
import { createEvent, supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');
  const [loading, setLoading] = createSignal(false);
  const [textInput, setTextInput] = createSignal('');
  const [audioUrl, setAudioUrl] = createSignal('');
  const [imageFile, setImageFile] = createSignal(null);
  const [imageDescription, setImageDescription] = createSignal('');
  const [highContrast, setHighContrast] = createSignal(false);

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('login');
  };

  const handleReadAloud = async () => {
    if (!textInput()) return;
    setLoading(true);
    try {
      const result = await createEvent('text_to_speech', {
        text: textInput()
      });
      setAudioUrl(result);
    } catch (error) {
      console.error('Error converting text to speech:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDescribeImage = async () => {
    if (!imageFile()) return;
    setLoading(true);
    try {
      // Upload image to storage or get a data URL
      const reader = new FileReader();
      reader.onload = async () => {
        const imageDataUrl = reader.result;
        const result = await createEvent('chatgpt_request', {
          prompt: `Describe this image: ${imageDataUrl}`,
          response_type: 'text'
        });
        setImageDescription(result);
      };
      reader.readAsDataURL(imageFile());
    } catch (error) {
      console.error('Error describing image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class={`min-h-screen ${highContrast() ? 'bg-black text-white' : 'bg-white text-black'} p-4`}>
      <Show
        when={currentPage() === 'homePage'}
        fallback={
          <div class="flex items-center justify-center min-h-screen">
            <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
              <h2 class="text-3xl font-bold mb-6 text-purple-600 text-center">Sign in with ZAPT</h2>
              <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline mb-6 block text-center"
              >
                Learn more about ZAPT
              </a>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={['google', 'facebook', 'apple']}
                magicLink={true}
                showLinks={false}
                authView="magic_link"
              />
            </div>
          </div>
        }
      >
        <div class="max-w-4xl mx-auto h-full flex flex-col">
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-4xl font-bold text-purple-600">Blind Accessibility Services</h1>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>

          <div class="flex space-x-4 mb-8">
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={highContrast()}
                onChange={() => setHighContrast(!highContrast())}
                class="cursor-pointer"
              />
              <span class="font-semibold">High Contrast Mode</span>
            </label>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
            <div class="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold mb-4 text-purple-600">Text-to-Speech</h2>
              <textarea
                placeholder="Enter text here..."
                value={textInput()}
                onInput={(e) => setTextInput(e.target.value)}
                class="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
              ></textarea>
              <button
                onClick={handleReadAloud}
                class={`mt-4 w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading()}
              >
                <Show when={loading() && !audioUrl()}>Processing...</Show>
                <Show when={!loading() || audioUrl()}>Read Aloud</Show>
              </button>
              <Show when={audioUrl()}>
                <div class="mt-4">
                  <h3 class="text-xl font-bold mb-2 text-purple-600">Audio Output</h3>
                  <audio controls src={audioUrl()} class="w-full" />
                </div>
              </Show>
            </div>

            <div class="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold mb-4 text-purple-600">Image Description</h2>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
              />
              <button
                onClick={handleDescribeImage}
                class={`mt-4 w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading()}
              >
                <Show when={loading() && !imageDescription()}>Processing...</Show>
                <Show when={!loading() || imageDescription()}>Describe Image</Show>
              </button>
              <Show when={imageDescription()}>
                <div class="mt-4">
                  <h3 class="text-xl font-bold mb-2 text-purple-600">Image Description</h3>
                  <p>{imageDescription()}</p>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default App;