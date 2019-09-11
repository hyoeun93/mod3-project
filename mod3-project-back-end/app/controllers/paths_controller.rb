class PathsController < ApplicationController
    def index
        # paths = Path.all
        # byebug
        @paths = Path.search(paths_params)
        # byebug
        render json: @paths.to_json(except: [:created_at, :updated_at]) 
    end

    def show
        path = Path.find_by(id: params[:id])
        render json: path.to_json(except: [:created_at, :updated_at])
    end 

    def delete
    end 

    private

    def paths_params
        params.require(:path).permit(:difficulty, :surface_type, :topography)
    end

end
